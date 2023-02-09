import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmPasswordValidator(
    field1: string,
    field2: string
  ): ValidatorFn {
    return (group: AbstractControl): 
    ValidationErrors | null => {
        if(group.get(field1)?.value != group.get(field2)?.value){
            const error = { mismatchedPassword: true };
            const prevErrors = group.get(field2)?.errors;
            group.get(field2)?.setErrors({...error, ...prevErrors});
            return error;
        }else {
            return null;
        }

    }
}
