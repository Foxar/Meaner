import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmPasswordValidator(
    field1: string,
    field2: string
  ): ValidatorFn {
    return (group: AbstractControl): 
    ValidationErrors | null => {
        if(group.get(field1)?.value != group.get(field2)?.value){
            return { mismatchedPassword: true }
        }else {
            return null;
        }

    }
}
