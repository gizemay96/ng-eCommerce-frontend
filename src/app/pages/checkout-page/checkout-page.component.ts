import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvc: string;

  get userAddress() {
    return this.addressService.getUserAddresses();
  }

  get user() {
    return this.userService.getUser();
  }

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(this.user.id));
  }

  purchase() {
    const selectedAddress = this.userAddress[0].id;
    const cartDetails = {
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      expDate: this.expDate,
      cvc: this.cvc,
    };
    this.purchaseService
      .purchase(cartDetails, selectedAddress)
      .subscribe((response) => {
        this.cardName = '';
        this.cardNumber = '';
        this.expDate = '';
        this.cvc = '';
      });
  }
}
