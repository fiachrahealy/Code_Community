import { Lesson } from "interfaces/lesson.interface";
import { EditRecord } from "./edit-record.interface";

export interface LessonEditRecord extends EditRecord {
  lesson: Lesson;
}
