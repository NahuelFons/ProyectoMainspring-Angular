import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { ICourse } from './models';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { Store } from '@ngrx/store';
import { CourseActions } from './store/course.actions';
import { selectCourseState, selectCoursesError, selectCoursesList, selectLoadingCourses } from './store/course.selectors';
import { selectInscriptionList } from '../inscriptions/store/inscription.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  courses = [];

  loadingCourses$: Observable<boolean>;
  error$: Observable<unknown>;
  courses$: Observable<ICourse[]>

  constructor(
    private coursesService: CoursesService, 
    private matDialog: MatDialog,
    private store: Store){
      this.loadingCourses$ = this.store.select(selectLoadingCourses);
      this.error$ = this.store.select(selectCoursesError);
      this.courses$ = this.store.select(selectCoursesList)
    }

    ngOnInit(): void {
      this.store.dispatch(CourseActions.loadCourses())
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
              this.store.dispatch(CourseActions.createCourse({ payload: result }))
            }
          },
        })
    }
    
    editCourse(course: ICourse): void {
      this.openDialog(course);
    }

    deleteCourseById(id: string): void {
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#d33',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(CourseActions.deleteCourseById({ id }))
        }
      });
    }
  }