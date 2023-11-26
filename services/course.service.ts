import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "interfaces/course.interface";
import { LessonService } from "./lesson.service";
import { UserService } from "./user.service";
import { environment } from "../src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  
  constructor(private userService: UserService, private http: HttpClient, private lessonService: LessonService, private authService: AuthService) { }

  // Get All Courses

  async getAllCourses(): Promise<Course[]> {
    return new Promise<Course[]>((resolve, reject) => {
      let courses: Array<Course> = [];

      this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getAllCourses/", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(
            (data) => {
              for (let i = 0; i < Object.values(data).length; i++) {
                let course: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                course._id = String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("_id")
                  ]
                );
                course.title = String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("title")
                  ]
                );
                course.level = String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("level")
                  ]
                );

                let lessons = Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("lessons")
                ] as any[];

                for (let j = 0; j < lessons.length; j++) {
                  this.lessonService
                    .getLesson(String(lessons[j]))
                    .then((lesson) => {
                      course.lessons[j] = lesson;
                    })
                    .catch((error) => reject(error));
                }

                let ratings = Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("ratings")
                ] as any[];

                for (let j = 0; j < ratings.length; j++) {
                  course.ratings.push(+ratings[j]);
                }

                courses[i] = course;
              }

              resolve(courses);
            },
            (error) => reject(error)
          );
      });
    });
  }

  // Get Course

  async getCourse(id: string | null): Promise<Course> {
    return new Promise<Course>((resolve, reject) => {
      let course: Course = {
        _id: "",
        title: "",
        level: "",
        lessons: [],
        ratings: [],
      };

      this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getCourse/" + id, {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(
            (data) => {
              course._id =
                Object.values(data)[Object.keys(data).indexOf("_id")];
              course.title =
                Object.values(data)[Object.keys(data).indexOf("title")];
              course.level =
                Object.values(data)[Object.keys(data).indexOf("level")];

              let lessons = Object.values(data)[
                Object.keys(data).indexOf("lessons")
              ] as any[];

              for (let j = 0; j < lessons.length; j++) {
                this.lessonService
                  .getLesson(String(lessons[j]))
                  .then((lesson) => {
                    course.lessons[j] = lesson;
                  })
                  .catch((error) => reject(error));
              }

              let ratings = Object.values(data)[
                Object.keys(data).indexOf("ratings")
              ] as any[];

              for (let j = 0; j < ratings.length; j++) {
                course.ratings.push(+ratings[j]);
              }

              resolve(course);
            },
            (error) => reject(error)
          );
      });
    });
  }

  // Update Course

  async updateCourse(previousCourse: Course, course: Course, userID: String, lessonsReordered: Boolean) {

    await this.authService.getRequestToken().then(async (token) => {

      let timestamp = new Date();

      if (previousCourse.title != course.title) {

        await this.http.post(environment.serverURL + '/updateCourseTitle', { 'newTitle': course.title, 'courseID': course._id }, { headers: new HttpHeaders().set('token', token) }).toPromise()
          .then(() => {
            this.http.post(environment.serverURL + '/createCourseTitleChangedRecord', { 'course': previousCourse._id, 'user': userID, 'timestamp': timestamp, 'previousTitle': previousCourse.title, 'newTitle': course.title }, { headers: new HttpHeaders().set('token', token) }).toPromise();
            this.userService.updateUserEditXP(userID, 3);
          });

      }

      for (let i = 0; i < course.lessons.length; i++) {

        if (course.lessons[i]._id.includes("unsaved")) {

          await this.http.post(environment.serverURL + '/createLesson', { 'title': course.lessons[i].title, 'course': course._id }, { headers: new HttpHeaders().set('token', token) }).toPromise()
            .then(async (lesson) => {
              if (lesson != undefined) {
                course.lessons[i]._id = String(Object.values(lesson)[Object.keys(lesson).indexOf("_id")]);
                await this.http.post(environment.serverURL + '/createCourseLessonAddedRecord', { 'course': course._id, 'user': userID, 'timestamp': timestamp, 'lessonAdded': course.lessons[i]._id }, { headers: new HttpHeaders().set('token', token) }).toPromise();
                this.userService.updateUserEditXP(userID, 5);
              }
            });

        }

      }

      for (let i = 0; i < previousCourse.lessons.length; i++) {

        let stillInCourse = false;

        for (let j = 0; j < course.lessons.length; j++) {

          if (previousCourse.lessons[i]._id == course.lessons[j]._id) {

            stillInCourse = true;
            break;

          }

        }

        if (!stillInCourse) {

          await this.http.post(environment.serverURL + '/createCourseLessonRemovedRecord', { 'course': previousCourse._id, 'user': userID, 'timestamp': timestamp, 'lessonRemoved': previousCourse.lessons[i]._id }, { headers: new HttpHeaders().set('token', token) }).toPromise();
          this.userService.updateUserEditXP(userID, 5);

        }

      }

      let lessonIDsNew: String[] = [];
      let lessonIDsPrevious: String[] = [];

      for (let i = 0; i < course.lessons.length; i++) {

        lessonIDsNew.push(course.lessons[i]._id);

      }

      for (let i = 0; i < previousCourse.lessons.length; i++) {

        lessonIDsPrevious.push(previousCourse.lessons[i]._id);

      }

      await this.http.post(environment.serverURL + '/updateCourseLessons', { 'lessons': lessonIDsNew, 'courseID': course._id }, { headers: new HttpHeaders().set('token', token) }).toPromise()
        .then(async () => {
          if (lessonsReordered) {
            await this.http.post(environment.serverURL + '/createCourseLessonsReorderedRecord', { 'course': previousCourse._id, 'user': userID, 'timestamp': timestamp, 'newLessons': lessonIDsNew, 'previousLessons': lessonIDsPrevious }, { headers: new HttpHeaders().set('token', token) }).toPromise();
            this.userService.updateUserEditXP(userID, 3);
          }
        });

    });
  }

  // Rate Course

  async rateCourse(courseID: string, rating: number) {
    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/updateCourseRating",
          { courseID: courseID, rating: rating },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }

  // Calculate Course Rating

  calculateCourseRating(ratings: Array<number>): number {
    if (ratings.length == 0) {
      return 0;
    }

    let sum = 0;

    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i];
    }

    return Math.floor(sum / ratings.length);
  }
}
