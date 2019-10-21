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
import { AddCoursesDialogComponent } from '../add-courses-dialog/add-courses-dialog.component';

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
  coursesAdded: ICourse[];
  mode: string;
  isAdmin: boolean = false;

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
    this.coursesAdded = [];
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
    const dialogRef = this.dialog.open(AddCoursesDialogComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private buildForm() {
    this.userRoleForm = this.fb.group({
      RoleName: ['', Validators.required],
      RoleDescription: ['', Validators.required],
    });

    this.userRoleForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

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
    const form = this.userRoleForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(formData: any) {
    if (this.mode == "Update") {
      this.userRoleService.put(formData)
        .subscribe(modal => {
          this.alertService.success("User Role Details Updated Successfully.");
        });
    }
    else {
      this.userRoleService.post(formData)
        .subscribe(modal => {
          this.alertService.success("User Role Details Added Successfully.");
        });
    }
  }

  formErrors = {
    'RoleName': '',
    'RoleDescription': '',
  };
  validationMessages = {
    'RoleName': {
      'required': 'Role name is required.'
    },
    'RoleDescription': {
      'required': 'Role description is required.'
    },
  };
}
