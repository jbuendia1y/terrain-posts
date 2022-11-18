import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private router: Router, private modalService: NgbModal) {}

  public navigate = (comands: any[], extras?: NavigationExtras) =>
    this.router.navigate(comands, extras);

  public openModal(content: any, options?: NgbModalOptions) {
    const ref = this.modalService.open(content, options);
    return ref;
  }
}
