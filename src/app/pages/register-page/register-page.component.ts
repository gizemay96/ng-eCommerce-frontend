import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomvalidationService } from '../../validations/customvalidation.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        // this.customValidator.patternValidator(),   "FOR PATTERN VALIDATION"
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: this.customValidator.MatchPassword(
        'password',
        'confirmPassword'
      ),
    }
  );

  isLoading: boolean = false;
  errorMsg = '';

  get userNameErrors() {
    return this.registerForm.controls.username.errors;
  }

  get passwordErrors() {
    return this.registerForm.controls.password.errors;
  }
  get confirmPassErrors() {
    return this.registerForm.controls.confirmPassword.errors;
  }

  get EmailErrors() {
    return this.registerForm.controls.email.errors;
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private customValidator: CustomvalidationService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const registerData = {
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
      };

      this.authService
        .register(registerData)
        .subscribe(this.registerSuccess, this.regErr);
    }
  }

  regErr = (error) => {
    this.errorMsg = error.error.message[0].messages[0].message;
    this._snackbar.open(this.errorMsg, 'OK', {
      duration: 5000,
    });
    this.isLoading = false;
  };

  registerSuccess = (response: AuthResponse) => {
    this.authService.setToken(response.jwt);
    this.userService.setUser(response.user);
    this.cartService.createCart(response.user.id);

    this.registerForm.reset();

    this.isLoading = false;
    this.errorMsg = '';

    this.router.navigateByUrl('/');
  };
}
