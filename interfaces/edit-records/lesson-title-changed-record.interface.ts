import { LessonEditRecord } from "./lesson-edit-record.interface";

export interface LessonTitleChangedRecord extends LessonEditRecord {
  previousTitle: String;
  newTitle: String;
}
