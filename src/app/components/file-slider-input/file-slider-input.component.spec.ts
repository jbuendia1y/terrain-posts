import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSliderInputComponent } from './file-slider-input.component';

describe('FileSliderInputComponent', () => {
  let component: FileSliderInputComponent;
  let fixture: ComponentFixture<FileSliderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSliderInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSliderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
