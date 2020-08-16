import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;

  baseUrl = 'http://localhost:1337/users';

  constructor(
    private http: HttpClient, 
    private cartService: CartService
  ) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const token = window.localStorage.getItem('token');

    if (!token) return;

    return this.http
      .get(`${this.baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe((response: User) => {
        this.user = response;
        console.log(response)
        
        this.getDetails();
        this.cartService.fetchUserCart(this.user.id)
      });
  }

  getDetails() {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    this.http
      .get(`${env.usersApiURL}/${this.user.id}`, httpOptions)
      .subscribe((response: any) => {
        
        if (response.avatar) {
          this.user.avatarUrl = `${env.baseApiURL}${response.avatar.url}`;
        } else {
          this.user.avatarUrl= 'assets/avatar-placeholder.png';
        }
      });
  }
}
