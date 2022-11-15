import { Component, Input, OnInit } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { getIcon } from 'src/app/libs';
import { IPost } from '../../models';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input('data') post: IPost = {
    id: 'Cargando',
    title: 'Cargando',
    description: 'Cargando',
    address: 'Cargando',
    price: 0,
    features: [],
    photos: [],
    user: {} as any,
    userId: 'Cargando',
    createdAt: {} as any,
  };
  faCamera = faCamera;

  public async getIcon(icon: string) {
    let val = await getIcon(icon);
    if (!val) val = faCamera;
    return val;
  }

  constructor() {}

  ngOnInit(): void {}
}
