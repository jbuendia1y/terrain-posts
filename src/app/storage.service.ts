import { Injectable } from '@angular/core';
import {
  Storage,
  uploadBytes,
  ref,
  uploadString,
  StorageReference,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly uploadSource = 'uploads';
  private uploadRef: StorageReference;

  constructor(private storage: Storage) {
    this.uploadRef = ref(this.storage, this.uploadSource);
  }

  async uploadFromBytes(files: FileList | File[]) {
    const result = await Promise.all(
      Array.from(files).map((f) => uploadBytes(this.uploadRef, f))
    );
    return result;
  }

  async uploadFromString(files: { value: string; name: string }[]) {
    const result = await Promise.all(
      Array.from(files).map((f) =>
        uploadString(this.uploadRef, f.value, 'base64url', {
          customMetadata: {
            name: f.name,
          },
        })
      )
    );
    return result;
  }

  async uploadFiles(
    files: FileList | { value: string; name: string }[] | File[]
  ) {
    if (files instanceof FileList) {
      console.log('files');
      return await this.uploadFromBytes(files);
    } else if (Array.isArray(files) && (files[0] as any).value) {
      console.log('strings');
      return await this.uploadFromString(files as any);
    } else if (Array.isArray(files) && (files[0] as any).text) {
      console.log('files');
      return await this.uploadFromBytes(files as File[]);
    } else return [];
  }
}
