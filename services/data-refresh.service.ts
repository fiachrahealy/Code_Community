import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataRefreshService {

  peopleListEvent: Subject<any> = new Subject();
  navUserEvent: Subject<any> = new Subject();
  profileFriendEvent: Subject<any> = new Subject();
  courseLessonsEvent: Subject<any> = new Subject();
  messageUnopened: Subject<any> = new Subject();
  courseViewEvent: Subject<any> = new Subject();

  constructor() { }

  // Refresh People List

  refreshPeopleList() {
    this.peopleListEvent.next(true);
  }

  // Refresh Nav User

  refreshNavUser() {
    this.navUserEvent.next(true);
  }

  // Refresh Profile Friend

  refreshProfileFriend() {
    this.profileFriendEvent.next(true);
  }

  // Refresh Course Lessons

  refreshCourseLessons() {
    this.courseLessonsEvent.next(true);
  }

  // Refresh Message Unopened

  refreshMessageUnopened() {
    this.courseLessonsEvent.next(true);
  }

  // Refresh Course View

  refreshCourseViewCourse() {
    this.courseViewEvent.next(true);
  }
}
