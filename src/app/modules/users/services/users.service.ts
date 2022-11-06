import { Injectable } from '@angular/core';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { collection, doc } from '@firebase/firestore';
import { ICreateUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly source = 'users';

  constructor(private firestore: Firestore) {}

  async create({ password: _, ...data }: ICreateUser) {
    const ref = doc(this.firestore, this.source, data.id);
    await setDoc(ref, data);
    return this.findOne(data.id);
  }

  findOne(id: string) {
    const ref = doc(this.firestore, this.source, id);
    return docData(ref);
  }
}
