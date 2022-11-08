import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [RouterModule, FontAwesomeModule],
})
export class SharedModule {}
