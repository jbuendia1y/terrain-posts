import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { lastValueFrom } from 'rxjs';
import { ICreateUser } from '../../users/models';
import { UsersService } from '../../users/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private usersService: UsersService,
    @Optional() private auth: Auth
  ) {}

  async login(email: string, password: string) {
    const res = await signInWithEmailAndPassword(this.auth, email, password);
    return await lastValueFrom(this.usersService.findOne(res.user.uid));
  }

  async singup(data: ICreateUser) {
    const res = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    const user = await lastValueFrom(await this.usersService.create(data));
    return user;
  }

  async signInWithGoogle() {
    const res = await signInWithPopup(this.auth, new GoogleAuthProvider());
    console.log(res);
    if (res.operationType === 'signIn') {
    }
  }

  async logout() {
    return await signOut(this.auth);
  }
}
