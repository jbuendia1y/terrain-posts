import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent, PostsComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostsComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
