import { Injectable } from '@angular/core';
import {
  Storage,
  uploadBytes,
  ref,
  uploadString,
  list,
  UploadMetadata,
  ListOptions,
  getDownloadURL,
} from '@angular/fire/storage';
import { from, map } from 'rxjs';

interface Options {
  path?: string;
  metadata?: UploadMetadata;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly uploadSource = 'uploads';

  constructor(private storage: Storage) {}

  async uploadFromBytes(files: FileList | File[], options?: Options) {
    const url = this.uploadSource.concat('/', options?.path?.concat('/') || '');
    const result = await Promise.all(
      Array.from(files).map((f) => {
        const r = ref(this.storage, url.concat(f.name));
        return uploadBytes(r, f, options?.metadata);
      })
    );
    return result;
  }

  async uploadFromString(
    files: { value: string; name: string }[],
    options?: Options
  ) {
    const url = this.uploadSource.concat('/', options?.path?.concat('/') || '');
    const result = await Promise.all(
      Array.from(files).map((f) => {
        const r = ref(this.storage, url.concat(f.name));
        return uploadString(r, f.value, 'base64url', options?.metadata);
      })
    );
    return result;
  }

  async uploadFiles(
    files: FileList | { value: string; name: string }[] | File[],
    options?: Options
  ) {
    console.log('UPLOADING ??');
    if (files instanceof FileList) {
      console.log('list files');
      return await this.uploadFromBytes(files, options);
    } else if (Array.isArray(files) && (files[0] as any).value) {
      console.log('strings');
      return await this.uploadFromString(files as any, options);
    } else if (Array.isArray(files) && (files[0] as any).text) {
      console.log('array files');
      return await this.uploadFromBytes(files as File[], options);
    } else {
      console.log('F');
      return [];
    }
  }

  findAll(options?: ListOptions, ...path: string[]) {
    const r = ref(this.storage, this.uploadSource.concat('/', path.join('/')));
    return from(list(r, options));
  }

  getDownloadUrl(...path: string[]) {
    const r = ref(this.storage, this.uploadSource.concat('/', path.join('/')));
    return getDownloadURL(r);
  }
}
