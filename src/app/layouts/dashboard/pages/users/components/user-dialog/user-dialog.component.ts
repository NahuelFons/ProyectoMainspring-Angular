import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { upperCaseValidator } from '../../../../../../shared/validators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsers } from '../../models';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private matDialogRef:MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IUsers
  ){
      this.userForm = this.formBuilder.group({
        firstName: ['', [Validators.required, upperCaseValidator(), Validators.minLength(3), Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
        lastName: ['', [Validators.required, upperCaseValidator(), Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
        email: ['', [Validators.required, upperCaseValidator(), Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]],
        englishLevel: ['A1', [Validators.required]],
      })
      
      if (editingUser){
        this.userForm.patchValue(editingUser)
      }
  }

  get firstNameControl() {
    return this.userForm.get('firstName');
  }

  get lastNameControl() {
    return this.userForm.get('lastName');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  onSave(): void{
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }

}
