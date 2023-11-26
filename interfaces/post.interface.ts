import { User } from "./user.interface";

export interface Post {
  _id: String;
  title: String;
  body: String;
  user: User;
  timestamp: Date;
  type: Number;
}
