import { IEndpointPost, IPost } from '../models';

export function createPostAddapted(ed: IEndpointPost): IPost {
  return {
    id: ed.id,
    title: ed.title,
    description: ed.description,
    content: ed.content,
    images: ed.images,
    contacts: ed.contacts,
    dimensions: ed.dimensions,
    features: ed.features,
    prices: ed.prices,
    ubication: ed.ubication,
    user: ed.user,
    createdAt: ed.createdAt.toDate(),
    updatedAt: ed.updatedAt.toDate(),
  };
}
