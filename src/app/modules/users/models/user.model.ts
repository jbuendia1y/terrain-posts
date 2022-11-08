export interface IUser {
  id: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;

  username?: string;
  email?: string;
  phone?: string;
}

export interface ICreateUser {
  id: string;
  avatar?: string;

  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}
