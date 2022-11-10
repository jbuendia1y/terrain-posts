import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OauthRoutingModule } from './oauth-routing.module';
import { LoginFormComponent } from './components';
import { LoginComponent, RegisterComponent } from './pages';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [LoginFormComponent, LoginComponent, RegisterComponent, RegisterFormComponent, ProfileDetailsComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OauthRoutingModule,
  ],
})
export class OauthModule {}
