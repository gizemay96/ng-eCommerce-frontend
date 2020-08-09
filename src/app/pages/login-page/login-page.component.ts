import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isLoading: boolean = false;

  form = {
    identifier: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;

    this.authService.login(this.form).subscribe((response: AuthResponse) => {
      this.authService.setToken(response.jwt);
      this.userService.setUser(response.user);
      this.cartService.fetchUserCart(response.user.id)

      this.isLoading = false;

      this.form = {
        identifier: '',
        password: '',
      };

      this.router.navigateByUrl('/');
    });
  }
}
