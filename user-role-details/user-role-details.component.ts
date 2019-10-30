import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssociateDetailService } from '../../service/associateDetail.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from '../../shared/alert.service';
import { CoursesService } from '../../service/courses.service';
import { IUserGroup } from '../../model/user-group';
import { UserGroupService } from '../../service/user-group.service';
import { ICourse } from '../../model/course';
import { ConfirmationDialogsService } from '../../shared/confirmationDialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';

@Component({
  selector: 'app-user-role-details',
  templateUrl: './user-role-details.component.html',
  styleUrls: ['./user-role-details.component.css']
})
export class UserRoleDetailsComponent implements OnInit {
  userRoleForm: FormGroup;
  userGroup: IUserGroup[];
  userGroupObject: IUserGroup;
  userRoleId: string;
  courseCount: number;
  coursesAdded: ICourse[] = [];
  mode: string;
  isAdmin: boolean = false;
  submitted = false;

  constructor(private fb: FormBuilder, private associateDetailService: AssociateDetailService,
    private route: ActivatedRoute, private router: Router,
    private alertService: AlertService,
    private userRoleService: UserGroupService,
    private coursesService: CoursesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => { this.userRoleId = params["id"] });
    this.checkUserRole();
    this.buildForm();
    this.courseCount = this.coursesAdded.length;
    if (this.userRoleId == "0" && this.userRoleId != undefined) {
      this.mode = "Add";
    }
    else {
      this.userRoleService.getUserRole(this.userRoleId)
        .subscribe(modal => {
          this.userGroup = modal;
          this.mode = "Update";
          this.bindData();
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        result.forEach(e => {
          this.coursesAdded.push(e);
        });
        this.courseCount = this.coursesAdded.length;
      }
    });
  }

  deleteCourse(courseData: ICourse): void {
    const index: number = this.coursesAdded.indexOf(courseData);
    if (index !== -1) {
      this.coursesAdded.splice(index, 1);
    }
    this.courseCount = this.coursesAdded.length;
  }

  private buildForm() {
    this.userRoleForm = this.fb.group({
      GroupName: ['', [Validators.required]],
      GroupCode: ['', [Validators.required]],
      GroupDescription: ['', [Validators.required]],
    });

    this.userRoleForm.valueChanges.subscribe(data => this.onValueChanged(data));
    //this.onValueChanged();
  }

  get f() { return this.userRoleForm.controls; }

  private checkUserRole() {
    this.userRoleService.get().subscribe(userRole => {
      this.userGroup = userRole;
      if (this.userGroup.find(i => i.GroupName == "Admin")) {
        this.isAdmin = true;
      }
    });
  }
  private bindData() {
    this.userGroupObject = this.userGroup[0];
    this.userRoleForm.setValue({
      RoleName: this.userGroupObject.GroupName,
      RoleDescription: this.userGroupObject.GroupDescription,
    });
  }

  private resetForm() {
    this.userRoleForm.reset();
  }
  private onValueChanged(data?: any) {

    if (!this.userRoleForm) {
      return;
    }
    // const form = this.userRoleForm;
    // for (const field in this.formErrors) {
    //   this.formErrors[field] = "";
    //   const control = form.get(field);
    //   if (control && control.dirty && !control.valid) {
    //     const messages = this.validationMessages[field];
    //     for (const key in control.errors) {
    //       this.formErrors[field] += messages[key] + ' ';
    //     }
    //   }
    // }
  }

  onSubmit() {

    this.submitted = true;
    if (this.userRoleForm.invalid) {
      return;
    }

    // if (this.mode == "Update") {
    //   this.userRoleService.put(formData)
    //     .subscribe(modal => {
    //       this.alertService.success("User Group Details Updated Successfully.");
    //     });
    // }
    // else {
    //   this.userRoleService.post(formData)
    //     .subscribe(modal => {
    //       this.alertService.success("User Group Details Added Successfully.");
    //     });
    // }

    // const form = this.userRoleForm;
    // for (const field in this.formErrors) {
    //   this.formErrors[field] = "";
    //   const control = form.get(field);
    //   if (control && !control.valid) {
    //     const messages = this.validationMessages[field];
    //     for (const key in control.errors) {
    //       this.formErrors[field] += messages[key] + ' ';
    //     }
    //   }
    // }

  }

  // formErrors = {
  //   'GroupName': '',
  //   'GroupCode': '',
  //   'GroupDescription': '',
  // };
  // validationMessages = {
  //   'GroupName': {
  //     'required': 'Group name is required.'
  //   },
  //   'GroupCode': {
  //     'required': 'Group code is required.'
  //   },
  //   'GroupDescription': {
  //     'required': 'Group description is required.'
  //   },
  // };
}
