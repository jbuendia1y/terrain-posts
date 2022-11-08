import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OauthRoutingModule } from './oauth-routing.module';
import { LoginFormComponent } from './components';
import { LoginComponent, RegisterComponent } from './pages';

@NgModule({
  declarations: [LoginFormComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OauthRoutingModule,
  ],
})
export class OauthModule {}
