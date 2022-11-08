import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AuthService } from '../../services';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('Mis nombres', Validators.required),
    lastName: new FormControl('Mis apellidos', Validators.required),
    username: new FormControl(
      'mi_nombre_de_usuario',
      Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(29),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9_]{7,29}$/),
      ])
    ),
    email: new FormControl(
      'example@example.com',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('**********', Validators.required),
    terms: new FormControl<null | boolean>(null, Validators.required),
    // phone: new FormGroup({
    //   countryCode: new FormControl('+51', Validators.required),
    //   number: new FormControl(
    //     '',
    //     Validators.compose([
    //       Validators.required,
    //       Validators.pattern('[- +()0-9]+'),
    //     ])
    //   ),
    // }),
  });

  constructor(
    private authService: AuthService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.invalid) return;
    const { terms, ...values } = this.registerForm.value;
    if (values.email === 'example@example.com') {
      this.registerForm.controls.email.setErrors({ required: true });
      return;
    }
    if (!terms) {
      this.registerForm.controls.terms.setErrors({ required: true });
      return;
    }
    await this.authService.singup({
      avatar: null,
      email: values.email || null,
      password: values.password || null,
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      username: values.username as string,
    });
    this.shared.navigate(['/']);
  }
}
