import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/address.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  get user() {
    return this.userService.getUser();
  }

  get userAddress() {
    return this.addressService.getUserAddresses();
  }

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(this.user.id));
  }

  openDialog(addressId?) {
    if (addressId) {
      let selectedAddress = this.addressService
        .getUserAddresses()
        .find((address) => address.id === addressId);

      let dialogRef = this.dialog.open(DialogExampleComponent, {
        data: {
          id: selectedAddress.id,
          addressName: selectedAddress.addressName,
          country: selectedAddress.country,
          city: selectedAddress.city,
          streetName: selectedAddress.streetName,
          suite: selectedAddress.suite,
          user: selectedAddress.user,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.addressService.editAddress(
          result,
          selectedAddress.id,
          this.user.id
        );
      });
    } else {
      let dialogRef = this.dialog.open(DialogExampleComponent, {
        data: {
          user: this.user,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.addressService.addAddress(result, this.user.id);
        }else{
          null;
        }
      });
    }
  }


  deleteAddress(addressId){
    this.addressService.deleteAddress(addressId,this.user.id)
  }


}
