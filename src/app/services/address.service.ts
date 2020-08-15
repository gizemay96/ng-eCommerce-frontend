import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Address } from '../types/address.type';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private userAddresses: Address[];

  constructor(private http: HttpClient) {}

  fetchUserAddress(userId) {
    this.http
      .get(`${env.addressApiURL}/?user=${userId}`)
      .subscribe((response: Address[]) => {
        this.userAddresses = response;
      });
  }

  getUserAddresses() {
    return this.userAddresses;
  }


  editAddress(newAddress,addressId,userId){
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

   this.http.put(`${env.addressApiURL}/${addressId}`, newAddress , httpOptions)
   .subscribe(response => {
      this.fetchUserAddress(userId);
      this.getUserAddresses()
    })
  }

  addAddress(newAddress,userId){
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    this.http.post(`${env.addressApiURL}`, newAddress , httpOptions)
    .subscribe((response:Address) => {
      this.userAddresses.push(response);
      this.fetchUserAddress(userId);
      this.getUserAddresses()
    })
  }

  deleteAddress(addressId,userId){
    console.log(addressId)
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    this.http.delete(`${env.addressApiURL}/${addressId}`)
    .subscribe(response => {
      this.fetchUserAddress(userId)
      this.getUserAddresses()
    })


  }





}
