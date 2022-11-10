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

  async uploadFromBytes(files: FileList) {
    const result = await Promise.all(
      Array.from(files).map((f) => uploadBytes(this.uploadRef, f))
    );
    return result;
  }

  async uploadFromString(files: string[]) {
    const result = await Promise.all(
      Array.from(files).map((f) => uploadString(this.uploadRef, f))
    );
    return result;
  }

  async uploadFiles(files: FileList | string[]) {
    if (files instanceof FileList) {
      return await this.uploadFromBytes(files);
    } else if (Array.isArray(files) && typeof files[0] === 'string') {
      return await this.uploadFromString(files);
    } else return [];
  }
}
