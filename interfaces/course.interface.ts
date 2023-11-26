import { Lesson } from "./lesson.interface";

export interface Course {
  _id: String;
  title: String;
  level: String;
  lessons: Lesson[];
  ratings: number[];
}
