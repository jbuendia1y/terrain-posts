import { Timestamp } from '@angular/fire/firestore';
import { IUser } from '../../users/models';

export interface ICreatePost {
  title: string;
  description: string;
  address: string;
  price: number;
  photos: { name: string; url: string }[];

  features: IFeature[];
  userId: string;
}

export interface IEndpoinPost extends IPost {
  createdAt: Timestamp;
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  photos: { name: string; url: string }[];

  features: IFeature[];
  userId: string;
  user: IUser;
  createdAt: any;
}

export interface IFeature {
  icon: string;
  quantity: number;
  label: string;
}
