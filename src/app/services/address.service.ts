import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Address } from '../types/address.type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private userAddresses: Address;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  fetchUserAddress() {
    const userId = this.userService.getUser().id

    this.http
      .get(`${env.addressApiURL}/?user=${userId}`)
      .subscribe((response: Address) => {
        this.userAddresses = response;
      });
  }

  getUserAddresses() {
    return this.userAddresses;
  }

  editAddress(address: Address) {
    console.log('EDİT', address)
    const token = window.localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return this.http.put(`${env.addressApiURL}/${address.id}`, address, options)
  }

  createAddress(address: Address) {
    console.log('CREATE', address)
    const token = window.localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const userId = this.userService.getUser().id

    return this.http.post(env.addressApiURL, {...address, user: userId}, options)
  }

  deleteAddress(addressId) {
    const token = window.localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return this.http.delete(`${env.addressApiURL}/${addressId}`, options)
  }
}
