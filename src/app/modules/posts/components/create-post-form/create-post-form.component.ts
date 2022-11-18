import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCamera, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/modules/oauth/services';
import { firstValueFrom, lastValueFrom, map, Observable, of } from 'rxjs';
import { PostsService } from '../../services';
import { readFile, slugify } from 'src/app/libs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFeature } from '../../models';
import { StorageService } from 'src/app/storage.service';
import { currencies } from 'src/app/modules/core/constants';
import { Currency } from 'src/app/modules/core/models';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css'],
})
export class CreatePostFormComponent implements OnInit {
  public faCamera = faCamera;
  public faXmark = faXmark;

  public currencies = currencies;

  postForm = new FormGroup({
    title: new FormControl('Publicacion de mi terreno o edificio', {
      validators: Validators.required,
      nonNullable: true,
    }),
    description: new FormControl('Descripcion de mi publicación', {
      validators: Validators.required,
      nonNullable: true,
    }),
    address: new FormControl('Av. Avenida de mi terreno XXXXX', {
      validators: Validators.required,
      nonNullable: true,
    }),
    price: new FormGroup({
      currency: new FormControl(Currency.PEN, {
        validators: Validators.required,
        nonNullable: true,
      }),
      quantity: new FormControl(0, {
        validators: Validators.required,
        nonNullable: true,
      }),
    }),
    photos: new FormControl<FileList>({} as FileList, {
      validators: Validators.required,
      nonNullable: true,
    }),
    features: new FormControl<IFeature[]>([], {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  slugify(s: string) {
    return slugify(s);
  }

  async open(content: TemplateRef<any>) {
    try {
      const ref = this.modalService.open(content, {
        centered: true,
        scrollable: false,
      });
      const res = await ref.result;
      if (!res) return;
      await this.onSubmit();
    } catch (err) {}
  }

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private modalService: NgbModal,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  setFiles(files: FileList) {
    if (!(files instanceof FileList)) return;
    this.postForm.controls.photos.setValue(files);
  }

  setFeatures(features: IFeature[]) {
    if (!Array.isArray(features)) return;
    this.postForm.controls.features.setValue(features);
  }

  async onSubmit() {
    const user = await firstValueFrom(this.authService.user$);
    const values = this.postForm.value;
    if (!user) throw new Error('To create a post, you will need login');
    console.log({ values, userId: user.id });
    let photos: Observable<{ name: string; url: string }[]> = of([]);
    if (values.photos) {
      photos = this.storageService
        .uploadFiles(values.photos, {
          path: slugify(values.title as string),
        })
        .pipe(
          map((v) =>
            v.map((v) => ({ url: v.ref.toString(), name: v.ref.name }))
          )
        );
    }

    const post = await firstValueFrom(
      await this.postsService.create({
        ...values,
        photos: lastValueFrom(photos),
        userId: user.id,
      } as any)
    );
    console.log(post);
  }
}
