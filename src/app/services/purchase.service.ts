import { Injectable } from '@angular/core';
import { AddressService } from './address.service';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import {environment as env} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private http: HttpClient
  ) { }

  purchase(cardDetails, selectedAddress) {
    const token = window.localStorage.getItem('token')
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const purchaseData = {
      ...cardDetails,
      cart: this.cartService.getUserCart().id,
      address: selectedAddress,
      user: this.userService.getUser().id
    }

    return this.http.post(`${env.purcaseApiURL}`, purchaseData, httpOptions)
  }
}
