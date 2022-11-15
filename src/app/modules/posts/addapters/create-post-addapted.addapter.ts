import { IEndpoinPost, IPost } from '../models';

export function createPostAddapted(ed: IEndpoinPost): IPost {
  return {
    id: ed.id,
    address: ed.address,
    createdAt: ed.createdAt.toDate(),
    description: ed.description,
    features: ed.features,
    photos: ed.photos,
    price: ed.price,
    title: ed.title,
    user: ed.user,
    userId: ed.userId,
  };
}
