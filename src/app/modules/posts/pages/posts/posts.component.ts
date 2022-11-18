import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginate } from 'src/app/modules/core/models';
import { IPost } from '../../models';
import { PostsService } from '../../services';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  public posts$: Observable<Paginate<IPost>>;

  onPageChange(page: number) {
    this.posts$ = this.postsService.findAll({
      page,
    });
  }

  onFilterChange(filter: { title: string }) {
    this.posts$ = this.postsService.findAll({
      title: filter.title,
    });
  }

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.findAll();
  }

  ngOnInit(): void {}
}
