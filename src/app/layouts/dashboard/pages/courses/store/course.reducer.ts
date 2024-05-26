import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourse } from '../models';
import { state } from '@angular/animations';

export const courseFeatureKey = 'course';

export interface State {
  courses: ICourse[],
  loadingCourses: boolean;
  error: unknown;
}

export const initialState: State = {
  courses: [],
  loadingCourses: false,
  error: null, 
};

export const reducer = createReducer(
  initialState,
  // Load Courses
  on(CourseActions.loadCourses, state => {
    return {
      ...state, 
      loadingCourses: true,
    }
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state, 
      courses: action.data,
      loadingCourses: false,
    }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingCourses: false,
    }
  }),
  // Create Courses
  on(CourseActions.createCourse, (state) => {
    return {
    ...state, 
    loadingCourse: true,
    } 
  }),
  on(CourseActions.createCourseSuccess, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      courses: [...state.courses, action.data]
    }
  }),
  on(CourseActions.createCourseFailure, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      error: action.error,
    }
  }),
  // Delete Courses
  on(CourseActions.deleteCourseById, (state) => {
    return {
      ...state,
      loadingCourses: true,
    }
  }),
  on(CourseActions.deleteCourseByIdSuccess, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      courses: state.courses.filter(course => course.id !== action.data.id)
    }
  }),
  on(CourseActions.deleteCourseByIdFailure, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      error: action.error,
    }
  })

);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

