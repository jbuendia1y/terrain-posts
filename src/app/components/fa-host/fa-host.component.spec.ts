import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaHostComponent } from './fa-host.component';

describe('FaHostComponent', () => {
  let component: FaHostComponent;
  let fixture: ComponentFixture<FaHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
