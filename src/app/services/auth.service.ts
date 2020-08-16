import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { User } from '../types/user.type';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:1337/auth';

  constructor(
    private http: HttpClient, 
    private userService: UserService,
    private cartService: CartService
  ) {}

  register(registerData) {
    return this.http.post(`${this.baseUrl}/local/register`, registerData);
  }

  login(loginData) {
    return this.http.post(`${this.baseUrl}/local`, loginData)
      .pipe(
        tap(this.tapHandler)
      )
  }

  tapHandler(response) {
    console.log('Successful Login', response)

    return of(response)
  }

  logout() {
    window.localStorage.removeItem('token');
    this.userService.setUser();
    this.cartService.resetCart();
  }

  setToken(token: string) {
    // this.jwt = token;
    window.localStorage.setItem('token', token);
  }

  isAuthenticated():boolean {
    return !!window.localStorage.getItem('token')
  }
}
