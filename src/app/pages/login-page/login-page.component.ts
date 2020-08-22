import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from '../../types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    identifier: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isLoading: boolean = false;
  isPasswordVisible: boolean = false;
  touch = this.loginForm.touched;

  errorMsg: string = '';

  get identifierErrors() {
    return this.loginForm.controls.identifier.errors;
  }

  get passwordErrors() {
    return this.loginForm.controls.password.errors;
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';

      this.authService
        .login(this.loginForm.value)
        .subscribe(this.loginSuccess, this.loginError);
    }
  }

  loginError = (error) => {
    //console.log('error', error.error.message[0].messages[0].message);
    this.errorMsg = error.error.message[0].messages[0].message;
    console.log(this.errorMsg);
    this._snackbar.open(this.errorMsg, 'OK', {
      duration: 5000,
    });
    this.isLoading = false;
  };

  loginSuccess = (response) => {
    this.authService.setToken(response.jwt);
    this.userService.setUser(response.user);
    this.cartService.fetchUserCart(response.user.id);

    this.isLoading = false;
    this.loginForm.reset();

    this.router.navigateByUrl('/');
  };
}
