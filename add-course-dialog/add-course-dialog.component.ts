import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../../shared/alert.service';
import { Output, EventEmitter, Inject } from '@angular/core';
import { ICourse } from '../../model/course';
import { CourseDetailService } from '../../service/course-detail.service';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {
  //description: FormControl;
  //courseName: FormControl;
  courseForm: FormGroup;
  courseDetail: ICourse[];
  courses: ICourse[];
  marked: false;
  selectedCourses: ICourse[] = [];
  courseLength: number = 0;
  submitted = false;
  //@Output() submitClicked = new EventEmitter<any>();
  courseType: Array<string> = ['RLG', 'common', 'Technology', 'UI'];
  documentType: Array<string> = ['txt', 'pdf', 'xml', 'json'];
  constructor(public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private courseDetailService: CourseDetailService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.courseForm = this.formBuilder.group({
      description: ['', []],
      courseName: ['', [Validators.required]]
    })
  }

  get f() { return this.courseForm.controls; }
  /*onSubmit(formData: any) {
    this.submitClicked.emit(formData);
  }*/

  onSearch(formData: any) {
    this.submitted = true;
    // if (this.courseForm.invalid) {
    //   return;
    // }

    this.courses = [];
    this.courseDetailService.getCourses().subscribe(model => {
      this.courseDetail = model
    });
    if (formData.description == null || formData.description == "") {
      this.courses = this.courseDetail.filter(obj => obj.CourseType == formData.courseName);
    }
    else {
      this.courses = this.courseDetail.filter(obj => obj.CourseType == formData.courseName && obj.Description == formData.description);
    }
    this.courseLength = this.courses.length;
  }

  onAddSubmit() {
    //this.submitClicked.emit(this.selectedCourses);
    this.dialogRef.close(this.selectedCourses);
  }

  toggleVisibility(e, data: any) {
    this.marked = e.target.checked;
    if (this.marked) {
      this.selectedCourses.push(data);
    }
    else {
      let i = this.selectedCourses.indexOf(data);
      this.selectedCourses.splice(i, 1);
    }
  }
}