import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/address.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddressDialogComponent } from '../dialogs/address-dialog/address-dialog.component';
import { Address } from 'src/app/types/address.type';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  get user() {
   return this.userService.getUser()
  }

  get userAddresses() {
    return this.addressService.getUserAddresses()
  }

  constructor(
    private userService:UserService, 
    private addressService:AddressService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress())
  }

  openAddressDialog(address: Address = {
    name: '',
    suite: '',
    streetName: '',
    city: '',
    country: ''
  }) {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      data: address
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('CLOSED', result)
      this.addressService.fetchUserAddress()
    })
  }

  deleteAddress(addressId) {
    console.log(addressId)
    this.addressService.deleteAddress(addressId)
      .subscribe(result => {
        console.log('DELETED')
        this.addressService.fetchUserAddress()
      })
  }

}
