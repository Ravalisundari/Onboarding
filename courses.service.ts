import { Injectable } from '@angular/core';
import { HttpInterceptorService } from '../shared/httpInterceptor.service';
import { Observable } from 'rxjs/Observable';
import { Response, Request, Http } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { ICourse } from '../model/course';

@Injectable()
export class CoursesService {

  private baseUrl: string;

  constructor(private httpInterceptorService: HttpInterceptorService) {
    this.baseUrl = "UserRoleDetail/";
  }

  getCourseList(): Observable<ICourse[]> {
    return of(this.getResponse());
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || "Server Error");
  }

  private getResponse(): ICourse[] {

    const first = { Id: "1", Name: "Course1", URL: "https://www.w3schools.com", Description: "Course1", CourseType: "A", DocumentType: "A"};
    const second = { Id: "2", Name: "Course2", URL: "https://www.tutorialspoint.com", Description: "Course2", CourseType: "B", DocumentType: "B"};
    const third = { Id: "3", Name: "Course3", URL: "https://www.geeks4geeks.com", Description: "Course3", CourseType: "C", DocumentType: "C"};

    return [first, second, third] as ICourse[];
  }
}
