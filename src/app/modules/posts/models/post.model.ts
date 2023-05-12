import { Timestamp } from '@angular/fire/firestore';
import { IUser } from '../../users/models';
import { IPrice } from './price.model';
import { IContact } from './contact.model';
import { IFeature } from './feature.model';

export interface ICreatePost {
  title: string;
  description: string;
  content: string;
  prices: Array<IPrice>;

  user: IUser;
  ubication: { country: string; city: string; avenue: string };
  features: Array<IFeature>;
  images: Array<string>;

  contacts: Array<IContact>;
  dimensions: { area: number; height: number };
}

export interface IEndpointPost extends Omit<IPost, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  content: string;
  prices: Array<IPrice>;

  user: IUser;
  ubication: { country: string; city: string; avenue: string };
  features: Array<IFeature>;
  images: Array<string>;

  contacts: Array<IContact>;
  dimensions: { area: number; height: number };

  createdAt: Date;
  updatedAt: Date;
}
