import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  get user() {
    return this.userService.getUser();
  }

  get userCart() {
    return this.cartService.getUserCart()
  }

  get cartLength() {
    return this.userCart.orders.reduce((total, order) => order.quantity + total, 0)
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
