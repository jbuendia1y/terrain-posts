import { Component, Input, OnInit } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, switchMap } from 'rxjs';
import { getIcon } from 'src/app/libs';
import { StorageService } from 'src/app/storage.service';
import { IPost } from '../../models';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input('data') post: IPost = {
    id: 'Cargando',
    title: 'Cargando',
    description: 'Cargando',
    address: 'Cargando',
    price: 0,
    features: [],
    photos: [],
    user: {} as any,
    userId: 'Cargando',
    createdAt: {} as any,
  };
  public previews: Observable<string[]> = of(['/assets/default_photo.png']);

  public async getIcon(icon: string) {
    let val = await getIcon(icon);
    if (!val) val = faCamera;
    return val;
  }

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    if (this.post.photos.length !== 0) {
      this.previews = this.storageService
        .findAll(
          {
            maxResults: 5,
          },
          this.post.id
        )
        .pipe(
          switchMap((v) =>
            Promise.all(
              v.items.map((v) =>
                this.storageService.getDownloadUrl(this.post.id, v.name)
              )
            )
          )
        );
    }
  }
}
