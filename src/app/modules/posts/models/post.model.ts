import { IUser } from '../../users/models';

export interface IPost {
  id: string;
  title: string;
  description: string;
  address: string;
  photos: { name: string; url: string }[];

  features: IFeature[];
  user: IUser;
}

export interface IFeature {
  icon: string;
  quantity: string;
  label: string;
}
