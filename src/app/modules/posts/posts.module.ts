import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CreatePostFormComponent } from './components/create-post-form/create-post-form.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFeatureFormComponent } from './components/create-feature-form/create-feature-form.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostCardComponent,
    CreatePostFormComponent,
    CreatePostComponent,
    CreateFeatureFormComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbCarouselModule,
    NgbDropdownModule,
    SharedModule,
    ReactiveFormsModule,
    PostsRoutingModule,
  ],
})
export class PostsModule {}
