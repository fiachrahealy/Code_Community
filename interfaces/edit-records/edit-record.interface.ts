import { Course } from "../course.interface";
import { User } from "../user.interface";

export interface EditRecord {
  _id: String,
  typeOfRecord: Number;
  typeOfEdit: Number;
  course: Course;
  user: User;
  timestamp: Date;
}
