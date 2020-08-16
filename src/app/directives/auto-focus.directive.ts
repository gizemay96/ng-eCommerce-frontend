import { Directive } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective {

  constructor(
    private matInput: MatInput
  ) { }

  ngOnInit() {
    setTimeout(() => this.matInput.focus())
  }
}
