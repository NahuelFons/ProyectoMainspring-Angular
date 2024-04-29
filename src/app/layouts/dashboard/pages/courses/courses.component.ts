import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { ICourse } from './models';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  courses: ICourse[] = [];

  constructor(
    private coursesService: CoursesService, 
    private matDialog: MatDialog){}

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
  }

  openDialog(editingCourse?: ICourse): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: editingCourse,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingCourse) {
              this.courses = this.courses.map((u) => u.id === editingCourse.id ? {...u, ...result} : u)
            } else {
              result.id = new Date().getTime();
              result.createdAt = new Date();
              this.courses = [... this.courses, result];
            }
          } 
        }
      })
      
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: "#d33",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.courses = this.courses.filter((u) => u.id !== id);
      }
    })
  }

}
