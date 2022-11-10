import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCamera, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { readFile } from 'src/app/libs';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { StorageService } from 'src/app/storage.service';
import { AuthService } from '../../services';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit {
  public faEmail = faMailBulk;
  public faCamera = faCamera;

  public alert: { type: string; message: string } | null = null;

  profileForm = new FormGroup({
    firstName: new FormControl('Nombres', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: new FormControl('Apellidos', {
      validators: Validators.required,
      nonNullable: true,
    }),
    avatar: new FormControl<File | null>(null),
  });

  get user$() {
    return this.authService.user$;
  }

  getPreviewURL(file: File): Promise<string> {
    return readFile(file) as Promise<string>;
  }

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private shared: SharedService
  ) {
    this.profileForm.disable();
  }

  ngOnInit(): void {
    const currentUser = this.user$.subscribe((v) => {
      if (v) {
        this.profileForm.setValue({
          firstName: v.firstName || 'Nombres',
          lastName: v.lastName || 'Apellidos',
          avatar: new File([], ''),
        });
      }
      currentUser.unsubscribe();
    });
  }

  detectFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] || null : null;
    if (!file) return;
    this.profileForm.controls.avatar.setValue(file);
  }

  closeAlert() {
    setTimeout(() => {
      this.alert = null;
    }, 5000);
  }

  async onSubmit() {
    const currentUser = await firstValueFrom(this.user$);
    if (!currentUser?.id) return;
    const { avatar, ...values } = this.profileForm.value;
    if (avatar) {
      console.log('Uploading avatar');
    }
    const res = await firstValueFrom(
      await this.authService.updateProfile(values)
    );
    this.alert = {
      type: 'success',
      message: 'Actualizó su perfil con existo !',
    };
    this.profileForm.disable();
    this.closeAlert();
    // this.storageService.uploadFromBytes(avatar);

    // this.usersService.update(currentUser.id, { avatar: avatarURL });
  }
}
