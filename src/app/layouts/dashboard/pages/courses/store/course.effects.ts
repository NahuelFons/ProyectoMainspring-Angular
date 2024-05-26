import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CoursesService } from '../courses.service';


@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    )
  })

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourse),
      concatMap((action) =>
        this.coursesService.createCourse(action.payload).pipe(
          map(data => CourseActions.createCourseSuccess({ data })),
          catchError(error => of(CourseActions.createCourseFailure({ error }))))
      )
    )
  })

  deleteCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCourseById),
      concatMap((action) =>
        this.coursesService.deleteCourseById(action.id).pipe(
          map(data => CourseActions.deleteCourseByIdSuccess({ data })),
          catchError(error => of(CourseActions.deleteCourseByIdFailure({ error }))))
      )
    )
  })

  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}