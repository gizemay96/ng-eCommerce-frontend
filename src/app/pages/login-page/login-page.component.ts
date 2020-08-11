import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from '../../types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    identifier:new FormControl('' , [
      Validators.required,
      Validators.minLength(3),
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ])
  })

  isPasswordVisible: boolean = false;
  isLoading: boolean = false;

  get identifierErrors() {
    return this.loginForm.controls.identifier.errors
  }

  get passwordErrors() {
    return this.loginForm.controls.password.errors
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe((response: AuthResponse) => {
      this.authService.setToken(response.jwt);
      this.userService.setUser(response.user);
      this.cartService.fetchUserCart(response.user.id)

      this.isLoading = false;

     this.loginForm.reset();

      this.router.navigateByUrl('/');
    });

  }


}
