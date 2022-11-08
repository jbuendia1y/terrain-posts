import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
  User,
} from '@angular/fire/auth';
import {
  firstValueFrom,
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  of,
} from 'rxjs';
import { ICreateUser, IUser } from '../../users/models';
import { UsersService } from '../../users/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<IUser | undefined | null> = of(undefined);

  constructor(
    private usersService: UsersService,
    @Optional() private auth: Auth
  ) {
    this.user$ = authState(this.auth).pipe(
      mergeMap((u) => {
        if (u) {
          return this.usersService.findOne(u.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email: string, password: string) {
    const res = await signInWithEmailAndPassword(this.auth, email, password);
    return await lastValueFrom(this.usersService.findOne(res.user.uid));
  }

  async singup(data: ICreateUser) {
    if (!data.email || !data.password)
      throw new Error('You need email and password');
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
    // No lastValueFrom, because findOne is listening for changes
    const exist = await firstValueFrom(
      this.usersService.findOne(res.user.uid),
      {
        defaultValue: null,
      }
    );
    if (exist) return exist;
    const created = await this.usersService.create({
      id: res.user.uid,
      email: res.user.email as string,
      avatar: res.user.photoURL || undefined,
    });

    await this.auth.currentUser?.reload();
    return created;
  }

  async logout() {
    return await signOut(this.auth);
  }
}
