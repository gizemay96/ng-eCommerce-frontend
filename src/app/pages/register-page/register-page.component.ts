import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  isLoading: boolean = false;

  form = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

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
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
    };

    this.authService
      .register(registerData)
      .subscribe((response: AuthResponse) => {
        
        this.userService.setUser(response.user);
        this.authService.setToken(response.jwt);
        this.cartService.createCart(response.user.id);

        this.form = {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        };

        this.isLoading = false;

        this.router.navigateByUrl('/');
      });
  }
}
