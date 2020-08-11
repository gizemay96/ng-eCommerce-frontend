import { Directive , Input } from '@angular/core';
import { Validator , AbstractControl , ValidationErrors , NG_VALIDATORS, ValidatorFn, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs'

@Directive({
  selector: '[EqualValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidationDirective, multi: true}]
})
export class EqualValidationDirective implements Validator {
  @Input('EqualValidation') controlNameToCopare:string;

  validate(control: AbstractControl): ValidationErrors | any {
    const controlToCopare = control.root.get(this.controlNameToCopare)
    
    if(controlToCopare){
      const subscription: Subscription = controlToCopare.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }

    return controlToCopare && controlToCopare.value !== control.value ? {'EqualValidation' : true} : null;

  }
}


