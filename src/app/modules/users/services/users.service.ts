import { Injectable } from '@angular/core';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { map } from 'rxjs';
import { ICreateUser, IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly source = 'users';

  constructor(private firestore: Firestore) {}

  async create({ password: _, ...data }: ICreateUser) {
    const ref = doc(this.firestore, this.source, data.id);
    await setDoc(ref, data);
    return this.findOne(data.id).pipe(map((v) => v as IUser));
  }

  findOne(id: string) {
    const ref = doc(this.firestore, this.source, id);
    return docData(ref).pipe(map((v) => v as IUser));
  }
}
