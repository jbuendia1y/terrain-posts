import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input('textAlign')
  public textAlign: 'center' | 'right' | 'left' = 'center';
  get textClass() {
    return 'text-' + this.textAlign;
  }

  public faGoogle = faGoogle;

  loginForm = new FormGroup({
    email: new FormControl('example@example.com', {
      nonNullable: true,
      validators: Validators.compose([Validators.email, Validators.required]),
    }),
    password: new FormControl('********', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  get user$() {
    return this.authService.user$;
  }

  constructor(
    private authService: AuthService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;
    try {
      const user = await this.authService.login(email, password);
      this.shared.navigate(['/']);
    } catch (err: any) {
      this.loginForm.setErrors({ wrongCredentials: true });
    }
  }

  async providerClick(provider: 'google') {
    if (provider === 'google') {
      const res = await this.authService.signInWithGoogle();
    }
    this.shared.navigate(['/']);
  }
}
