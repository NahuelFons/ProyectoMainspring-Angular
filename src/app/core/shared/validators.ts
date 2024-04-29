import { AbstractControl, ValidatorFn } from "@angular/forms";

export function upperCaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value && control.value == control.value.toUpperCase()) {
          return { uppercase: true };
        }
        return null;
    }
}