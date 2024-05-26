import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourse, ICreateCoursePayload } from '../models';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Create Course': props<{ payload: ICreateCoursePayload }>(),
    'Create Course Success': props<{ data: ICourse }>(),
    'Create Course Failure': props<{ error: unknown }>(),

    'Delete Course By Id': props<{ id: string }>(),
    'Delete Course By Id Success': props<{ data: ICourse }>(),
    'Delete Course By Id Failure': props<{ error: unknown }>(),
  }
});
