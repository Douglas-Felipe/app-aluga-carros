import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../../../shared/validators/match-password.validator';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [matchPasswordValidator('password', 'confirmPassword')]
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get usernameRequiredError(): boolean {
    return !!this.username?.hasError('required') && !!this.username?.touched;
  }

  get passwordRequiredError(): boolean {
    return !!this.password?.hasError('required') && !!this.password?.touched;
  }

  get passwordMinLengthError(): boolean {
    const minLength = this.password?.errors?.['minlength']?.['requiredLength'];
    return !!this.password?.hasError('minlength') && !!this.password?.touched;
  }

  get confirmPasswordRequiredError(): boolean {
    return !!this.confirmPassword?.hasError('required') && !!this.confirmPassword?.touched;
  }

  get formMatchPasswordError(): boolean {
    return !!this.registerForm.hasError('mustMatch') && !!this.confirmPassword?.touched;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Dados do formulário:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
