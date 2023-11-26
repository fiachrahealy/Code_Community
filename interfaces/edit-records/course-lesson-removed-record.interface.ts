import { CourseEditRecord } from "./course-edit-record.interface";
import { Lesson } from "../lesson.interface";

export interface CourseLessonRemovedRecord extends CourseEditRecord {
  lessonRemoved: Lesson;
}
