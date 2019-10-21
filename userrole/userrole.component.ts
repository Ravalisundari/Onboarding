import { Component, OnInit } from '@angular/core';
import { AssociateDetailService } from '../../service/associateDetail.service';
import { IAssociateDetail } from '../../model/associateDetail';
import { IAssociatePlan } from '../../model/associatePlan';
import { Router } from '@angular/router';
import { UserRoleService } from '../../service/userRole.service';
import { UserGroupService } from '../../service/user-group.service';
import { IUserRole } from '../../model/userRole';
import { ConfirmationDialogsService } from '../../shared/confirmationDialog.service';
import { AlertService } from '../../shared/alert.service';
import { UserGroup, IUserGroup } from '../../model/user-group';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GroupViewComponent } from '../group-view/group-view.component';

@Component({
    selector: 'app-userrole',
    templateUrl: './userrole.component.html',
    styleUrls: ['./userrole.component.css']
})
export class UserroleComponent implements OnInit {

    //associateDetail: IAssociateDetail[];
    id: any;
    //associateId: string;
    userRoleId: string;
    public isView: boolean = false;
    modeType: string;
    //userRole: IUserRole[];
    userGroup: IUserGroup[];
    userRoleCount: number = 0;
    isAdmin: boolean = true;

    bsModalRef: BsModalRef;

    viewGroupDetails(groupDetails: IUserGroup) {
        const initialState = {
            list: [
                groupDetails.GroupId,
                groupDetails.GroupName,
                groupDetails.GroupDescription],
            groupDetails,
            title: 'Group Details'
        };
        this.bsModalRef = this.modalService.show(GroupViewComponent, { initialState });
        this.bsModalRef.content.closeBtnName = 'Close';
    }

    constructor(private router: Router, private userRoleService: UserRoleService, private userGroupService: UserGroupService,
        private confirmationDialogsService: ConfirmationDialogsService, private alertService: AlertService,
        private modalService: BsModalService) {
    }

    ngOnInit() {
        this.getUserRoleListDetails();
    }

    private getUserRoleListDetails() {
        this.userGroupService.get().subscribe(modal => {
            this.userGroup = modal
            this.userRoleCount = modal.length;
        });
    }



    editUserRoleDetail(userRoleId: string): any {
        this.router.navigate(['/userRoleDetail', userRoleId]);
    }

    addUserRoleDetail(): void {
        this.isView = false;
        this.isView = true
        this.modeType = "Add";
    }
    closeDetail(isClose: boolean): void {
        this.isView = isClose;
    }
    deleteUserRoleDetail(userRoleId: string): void {
        this.confirmationDialogsService.confirmWithoutContainer("Confirmation", "Are you sure you want to delete this user role detail? ", true)
            .subscribe(result => {
                if (result) {
                    this.userRoleService.deleteUserRole(userRoleId)
                        .subscribe(data => this.alertService.success("User Role Deleted Successfully."));
                    this.getUserRoleListDetails();
                }
            })
    }

    // triggerMail(associateId: string){
    //     this.associateDetailService.triggerOnboarding(associateId)
    //             .subscribe(modal => {
    //                 this.alertService.success("Onboarding Initiated Successfully");
    //             });
    // }

}
