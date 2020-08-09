import { Injectable } from '@angular/core';
import { AddressService } from './address.service';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http:HttpClient,
    private addressService:AddressService,
    private cartService:CartService,
    private userService:UserService,
    private orderService:OrderService,
  ) { }

  purchase(cardDetails , selectedAddress){
    console.log('purchase' , cardDetails);

    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const purchaseData = {
     ...cardDetails,
     cart:this.cartService.getUserCart().id,
     address: selectedAddress,
     user: this.userService.getUser().id,
     }

     return this.http.post(`${env.purcaseApiURL}` , purchaseData , httpOptions)
  }
}
