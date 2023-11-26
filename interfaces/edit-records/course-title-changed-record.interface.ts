import { CourseEditRecord } from "./course-edit-record.interface";

export interface CourseTitleChangedRecord extends CourseEditRecord {
  previousTitle: String;
  newTitle: String;
}
