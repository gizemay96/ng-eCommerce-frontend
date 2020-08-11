import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  get user() {
   return this.userService.getUser()
  }

  get userAddress() {
    return this.addressService.getUserAddresses()
  }

  constructor(private userService:UserService, private addressService:AddressService) { }

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(this.user.id)) 
  }

}
