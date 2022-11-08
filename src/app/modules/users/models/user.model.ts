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
  avatar?: string | null;

  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
}
