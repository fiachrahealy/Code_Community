import { CourseEditRecord } from "./course-edit-record.interface";
import { Lesson } from "../lesson.interface";

export interface CourseLessonAddedRecord extends CourseEditRecord {
  lessonAdded: Lesson;
}
