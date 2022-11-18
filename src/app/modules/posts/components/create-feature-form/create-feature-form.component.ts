import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IFeature } from '../../models';

@Component({
  selector: 'app-create-feature-form',
  templateUrl: './create-feature-form.component.html',
  styleUrls: ['./create-feature-form.component.css'],
})
export class CreateFeatureFormComponent implements OnInit {
  public faXmark = faXmark;

  featureForm = new FormGroup({
    quantity: new FormControl(0, {
      validators: Validators.required,
      nonNullable: true,
    }),
    icon: new FormControl('fa fa-user', {
      validators: Validators.required,
      nonNullable: true,
    }),
    label: new FormControl('Usuario', {
      validators: Validators.compose([
        Validators.required,
        Validators.maxLength(15),
      ]),
      nonNullable: true,
    }),
  });

  public features: IFeature[] = [];
  @Output('submit') submit = new EventEmitter<IFeature[]>();

  constructor() {}

  ngOnInit(): void {}

  addIcon(key: string) {
    this.featureForm.controls.icon.setValue(key);
  }

  deleteFeature(idx: number) {
    this.features.splice(idx, 1);
    this.submit.emit(this.features);
  }

  onIconPickerSelect(i: string) {
    this.featureForm.controls.icon.setValue(i);
  }

  onSubmit() {
    if (!this.featureForm.valid) return;
    const value = this.featureForm.value as IFeature;
    this.features.push(value);
    this.submit.emit(this.features);
  }
}
