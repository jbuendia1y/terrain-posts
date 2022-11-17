import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  HeaderComponent,
  FaHostComponent,
  SearchInputComponent,
  FileSliderInputComponent,
} from 'src/app/components';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    FaHostComponent,
    SearchInputComponent,
    FileSliderInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbCarouselModule,
    NgbAlertModule,
  ],
  exports: [
    RouterModule,
    FontAwesomeModule,
    HeaderComponent,
    NgbAlertModule,
    NgbCarouselModule,
    FaHostComponent,
    FileSliderInputComponent,
    SearchInputComponent,
  ],
})
export class SharedModule {}
