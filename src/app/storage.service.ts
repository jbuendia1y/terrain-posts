import { Injectable } from '@angular/core';
import {
  Storage,
  uploadBytes,
  ref,
  uploadString,
  list,
  UploadMetadata,
  uploadBytesResumable,
  ListOptions,
  getDownloadURL,
} from '@angular/fire/storage';
import { from, of } from 'rxjs';

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

  uploadFromBytes(files: FileList | File[], options?: Options) {
    const url = this.uploadSource.concat('/', options?.path?.concat('/') || '');
    const result = from(
      Promise.all(
        Array.from(files).map((f) => {
          const r = ref(this.storage, url.concat(f.name));
          return uploadBytes(r, f, options?.metadata);
        })
      )
    );
    return result;
  }

  uploadResumable(files: FileList | File[], options?: Options) {
    const url = this.uploadSource.concat('/', options?.path?.concat('/') || '');
    const result = of(
      Array.from(files).map((f) => {
        const r = ref(this.storage, url.concat(f.name));
        return uploadBytesResumable(r, f, options?.metadata);
      })
    );
    return result;
  }

  uploadFromString(
    files: { value: string; name: string }[],
    options?: Options
  ) {
    const url = this.uploadSource.concat('/', options?.path?.concat('/') || '');
    const result = from(
      Promise.all(
        Array.from(files).map((f) => {
          const r = ref(this.storage, url.concat(f.name));
          return uploadString(r, f.value, 'base64url', options?.metadata);
        })
      )
    );
    return result;
  }

  uploadFiles(
    files: FileList | { value: string; name: string }[] | File[],
    options?: Options
  ) {
    if (files instanceof FileList) {
      return this.uploadFromBytes(files, options);
    } else if (Array.isArray(files) && (files[0] as any).value) {
      return this.uploadFromString(files as any, options);
    } else if (Array.isArray(files) && (files[0] as any).text) {
      return this.uploadFromBytes(files as File[], options);
    } else {
      return of();
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
