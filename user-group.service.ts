import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { IUserRole } from '../model/userRole';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpInterceptorService } from '../shared/httpInterceptor.service';
import { environment } from '../../environments/environment.prod';
import { of } from "rxjs/observable/of";
import { IUserGroup } from '../model/user-group';
import { ICourse } from '../model/course';

@Injectable()
export class UserGroupService {
  private baseUrl: string;
  private header: Headers;
  private options: RequestOptions;
  courses: ICourse[];

  constructor(public httpInterceptorService: HttpInterceptorService) {
    this.baseUrl = "UserRole";
    this.options = new RequestOptions({ headers: this.header });
  }

  get(): Observable<IUserGroup[]> {
    return of(this.getResponse());
  }

  getUserRole(userRoleId?: string): Observable<IUserGroup[]> {
    return of(this.getResponse());
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private getResponse(): IUserGroup[] {

    const first = { GroupId: "1", GroupName: "Developer", GroupCode: "A", GroupDescription: "Project 1", Courses: this.courses };
    const second = { GroupId: "2", GroupName: "Automation Tester", GroupCode: "B", GroupDescription: "Project 2", Courses: this.courses };
    const third = { GroupId: "3", GroupName: "Manual Tester", GroupCode: "C", GroupDescription: "Project 3", Courses: this.courses };

    return [first, second, third] as IUserGroup[];
  }

  post(modal: IUserRole): Observable<IUserRole> {
    let body = JSON.stringify(modal);
    return this.httpInterceptorService.post(this.baseUrl, body, this.options)
      .map((response: Response) => <IUserRole>response.json())
      .catch(this.handleError);
  }
  put(modal: IUserRole): Observable<IUserRole> {
    let body = JSON.stringify(modal);
    return this.httpInterceptorService.put(this.baseUrl, body, this.options)
      .map((response: Response) => <IUserRole>response.json())
      .catch(this.handleError);
  }
  deleteUserRole(userRoleId: string): Observable<any> {
    return this.httpInterceptorService.delete(this.baseUrl + "?Id=" + userRoleId)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

}
