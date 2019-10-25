import { Injectable } from '@angular/core';
import { HttpInterceptorService } from '../shared/httpInterceptor.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { ICourse } from '../model/course';


@Injectable()
export class CourseDetailService {

  private baseUrl: string;
  private header: Headers;
  private options: RequestOptions;

  constructor(private httpInterceptorService: HttpInterceptorService, private http: Http) {
    this.baseUrl = "CourseDetails";
    this.header = new Headers({
      "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    });
    this.options = new RequestOptions({ headers: this.header });
  }

  getCourses(courseId?: string): Observable<ICourse[]> {
    return of(this.getResonse());
  }

  getCourse(courseId?: string): Observable<ICourse> {
    return of(this.getSingleResponse());
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.httpInterceptorService.delete(this.baseUrl + "?Id=" + courseId)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  post(model: ICourse): Observable<ICourse> {
    let body = JSON.stringify(model);
    return this.httpInterceptorService.post(this.baseUrl, body, this.options)
      .map((response: Response) => <ICourse>response.json())
      .catch(this.handleError);
  }

  put(model: ICourse): Observable<ICourse> {
    let body = JSON.stringify(model);
    return this.httpInterceptorService.put(this.baseUrl, body, this.options)
      .map((response: Response) => <ICourse>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server Error');
  }

  private getResonse(): ICourse[] {

    const first = {
      Id: "1",
      Name: "Angular",
      URL: "https://angular.io/tutorial",
      Description: "Basic concepts",
      CourseType: "common",
      DocumentType: "txt"
    };
    const second = {
      Id: "12",
      Name: "Cucumber",
      URL: "https://Cucumber.io/tutorial",
      Description: "Advanced concepts in Automation Testing",
      CourseType: "RLG",
      DocumentType: "pdf"
    };
    const third = {
      Id: "123",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "common",
      DocumentType: "txt"
    };
    const fourth = {
      Id: "1234",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "Technology",
      DocumentType: "txt"
    };
    const fifth = {
      Id: "1234",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "Technology",
      DocumentType: "txt"
    };
    const sixth = {
      Id: "12346",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "RLG",
      DocumentType: "txt"
    };

    return [first, second, third, fourth, fifth, sixth] as ICourse[];
  }

  private getSingleResponse(): ICourse {
    const first = {
      Id: "1",
      Name: "Angular",
      URL: "https://angular.io/tutorial",
      Description: "Basic concepts",
      CourseType: "Service Integration",
      DocumentType: "pdf"
    };
    return first as ICourse;
  }
}