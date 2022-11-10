import { Component, OnInit } from '@angular/core';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/modules/oauth/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public faHome = faHome;
  public faUser = faUserAlt;

  get user$() {
    return this.authService.user$;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
