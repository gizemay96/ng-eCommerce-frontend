import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from '../types/address.type';
import { User } from '../types/user.type';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss'],
})
export class DialogExampleComponent implements OnInit {
  addressForm = new FormGroup({
    addressName: new FormControl('', [Validators.required]),
    suite: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    user: new FormControl(this.address.user, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public address: Address,
  ) {}

  ngOnInit(): void {}

  editAddress() {
    let updatedAddress = {
      addressName: this.addressForm.get('addressName').value
        ? this.addressForm.get('addressName').value
        : this.address.addressName,
      streetName: this.addressForm.get('streetName').value
        ? this.addressForm.get('streetName').value
        : this.address.streetName,
      suite: this.addressForm.get('suite').value
        ? this.addressForm.get('suite').value
        : this.address.suite,
      city: this.addressForm.get('city').value
        ? this.addressForm.get('city').value
        : this.address.city,
      country: this.addressForm.get('country').value
        ? this.addressForm.get('country').value
        : this.address.country,
      user: this.address.user,
    };
    this.dialogRef.close(updatedAddress);
  }

  addAddress() {
    this.dialogRef.close(this.addressForm.value ? this.addressForm.value : null);
  }
}
