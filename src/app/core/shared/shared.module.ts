import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { ValidationPipePipe } from './validation-pipe.pipe';
import { FullNamePipe } from './fullname.pipe';// No entiendo por que cuando agrego a exports: FullNamePipe se rompe todo.
import { SizeDirective } from './size.directive'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ValidationPipePipe,
    SizeDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatListModule,
    ValidationPipePipe,
    SizeDirective,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class SharedModule { }
