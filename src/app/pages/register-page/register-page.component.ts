import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  // form = {
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isLoading: boolean = false;

  get nameErrors() {
    return this.registerForm.controls.name.errors;
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
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.isLoading = true;

    const registerData = {
      username: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    };

    this.authService
      .register(registerData)
      .subscribe((response: AuthResponse) => {
        this.userService.setUser(response.user);
        this.authService.setToken(response.jwt);
        this.cartService.createCart(response.user.id);

        this.registerForm.reset();

        this.isLoading = false;

        this.router.navigateByUrl('/');
      });
  }
}
