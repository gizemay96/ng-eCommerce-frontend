import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Address } from 'src/app/types/address.type';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {
  address: Address = {
    name: this.data.name,
    streetName: this.data.streetName,
    suite: this.data.suite,
    city: this.data.city,
    country: this.data.country,
  }
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Address,
    private dialogRef: MatDialogRef<AddressDialogComponent>,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close()
  }

  save() {
    this.isLoading = true

    if (this.data.id) {
      this.addressService.editAddress({...this.data, ...this.address})
        .subscribe(result => {
          console.log('EDİTED', result)
          this.isLoading = false
          this.close()
        })
    } else {
      this.addressService.createAddress(this.address)
        .subscribe(result => {
          console.log('ADDED', result)
          this.isLoading = false
          this.close()
        })
    }
  }
}
