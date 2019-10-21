import { ICourse } from "./course";

export interface IUserGroup {
    GroupId: string,
    GroupName: string,
    GroupCode: string,
    GroupDescription: string,
    Courses: ICourse[]
}

export class UserGroup implements IUserGroup {

    constructor(
        public GroupId: string,
        public GroupName: string,
        public GroupCode: string,
        public GroupDescription: string,
        public Courses: ICourse[]) {
    }
}