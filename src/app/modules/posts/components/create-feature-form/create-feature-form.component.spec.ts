import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeatureFormComponent } from './create-feature-form.component';

describe('CreateFeatureFormComponent', () => {
  let component: CreateFeatureFormComponent;
  let fixture: ComponentFixture<CreateFeatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFeatureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
