import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  limit,
  query,
  collectionSnapshots,
  setDoc,
  serverTimestamp,
  where,
  documentId,
} from '@angular/fire/firestore';
import { map, mergeMap, Observable } from 'rxjs';
import { slugify } from 'src/app/libs';
import { Paginate } from '../../core/models';
import { createPostAddapted } from '../addapters';
import { ICreatePost, IEndpointPost, IPost } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly source = 'posts';
  private readonly limit = 15;

  constructor(private firestore: Firestore) {}

  async create(data: ICreatePost): Promise<Observable<IPost>> {
    const id = slugify(data.title);
    const ref = doc(this.firestore, this.source, id);
    await setDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return this.findOne(id);
  }

  findOne(id: string): Observable<IPost> {
    const ref = doc(this.firestore, this.source, id);
    return docData(ref, { idField: 'id' }).pipe(
      map((v) => createPostAddapted(v as IEndpointPost))
    );
  }

  findAll(
    {
      page = 1,
      title,
    }: {
      page?: number;
      title?: string;
    } = { page: 1 }
  ): Observable<Paginate<IPost>> {
    if (page === 0) throw new Error("Page prop shouldn't be 0 value");
    const q = query(
      collection(this.firestore, this.source),
      limit(page * this.limit),
      ...(title ? [where(documentId(), '>=', slugify(title))] : [])
    );
    return collectionSnapshots(collection(this.firestore, this.source)).pipe(
      map((v) => v.length),
      mergeMap((totalDocs) => {
        return collectionData(q, { idField: 'id' }).pipe(
          map((v) => ({
            total: totalDocs,
            currentPage: page,
            items: (v as IEndpointPost[]).map(createPostAddapted),
          }))
        );
      })
    );
  }
}
