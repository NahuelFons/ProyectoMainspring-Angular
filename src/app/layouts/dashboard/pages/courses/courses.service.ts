import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICourse, ICreateCoursePayload } from "./models";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CoursesService {
    constructor (private httpClient: HttpClient) {}

    getCourses(): Observable<ICourse[]> {
        return this.httpClient.get<ICourse[]>(environment.baseAPIURL + '/courses')
    }

    createCourse(payload: ICreateCoursePayload): Observable<ICourse> {
        return this.httpClient.post<ICourse>(environment.baseAPIURL + '/courses', payload)
    }

    deleteCourseById(id: string): Observable<ICourse> {
        return this.httpClient.delete<ICourse>(environment.baseAPIURL + '/courses/' + id)
    }
}

