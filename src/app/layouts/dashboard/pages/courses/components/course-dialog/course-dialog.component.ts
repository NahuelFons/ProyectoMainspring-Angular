import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models';
import { upperCaseValidator } from '../../../../../../core/shared/validators';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {
  CourseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private matDialogRef:MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: ICourse
  ){
      this.CourseForm = this.formBuilder.group({
        name: ['', [Validators.required, upperCaseValidator(), Validators.minLength(3)]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required, upperCaseValidator(), Validators.minLength(35), Validators.maxLength(150)]],
      })
      
      if (editingCourse){
        this.CourseForm.patchValue(editingCourse)
      }
  }

  get nameControl() {
    return this.CourseForm.get('name');
  }

  get priceControl() {
    return this.CourseForm.get('price');
  }

  get descriptionControl() {
    return this.CourseForm.get('description');
  }

  onSave(): void{
    if (this.CourseForm.invalid){
      this.CourseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.CourseForm.value);
    }
  }

}
