import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ICourse } from '../../model/course';
import { IUserGroup } from '../../model/user-group';
import { CoursesService } from '../../service/courses.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];
  groupDetails: IUserGroup;
  courseCount: number;
  courseList: ICourse[];
  constructor(public bsModalRef: BsModalRef, private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourseList();
  }

  private getCourseList() {
    this.coursesService.getCourseList().subscribe(modal => {
      this.courseList = modal
      this.courseCount = modal.length;
    });
  }

}
