export interface ICourse {
    Id: string,
    Name: string,
    CourseType: string,
    URL: string,
    DocumentType: string,
    Description: string
}

export class Course implements ICourse {
    constructor(
        public Id: string,
        public Name: string,
        public CourseType: string,
        public URL: string,
        public DocumentType: string,
        public Description: string) {
    }
}