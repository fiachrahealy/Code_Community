import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Chunk } from "interfaces/chunk.interface";
import { CourseLearnRecord } from "interfaces/course-learn-record";
import { Course } from "interfaces/course.interface";
import { CourseLessonAddedRecord } from "interfaces/edit-records/course-lesson-added-record.interface";
import { CourseLessonRemovedRecord } from "interfaces/edit-records/course-lesson-removed-record.interface";
import { CourseLessonsReorderedRecord } from "interfaces/edit-records/course-lessons-reordered-record.interface";
import { CourseTitleChangedRecord } from "interfaces/edit-records/course-title-changed-record.interface";
import { EditRecord } from "interfaces/edit-records/edit-record.interface";
import { LessonChunkAddedRecord } from "interfaces/edit-records/lesson-chunk-added-record.interface";
import { LessonChunkEditedRecord } from "interfaces/edit-records/lesson-chunk-edited-record.interface";
import { LessonChunkRemovedRecord } from "interfaces/edit-records/lesson-chunk-removed-record.interface";
import { LessonChunksReorderedRecord } from "interfaces/edit-records/lesson-chunks-reordered-record.interface";
import { LessonTitleChangedRecord } from "interfaces/edit-records/lesson-title-changed-record.interface";
import { Lesson } from "interfaces/lesson.interface";
import { User } from "interfaces/user.interface";
import { CourseService } from "./course.service";
import { LessonService } from "./lesson.service";
import { UserService } from "./user.service";
import { environment } from "../src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RecordService {

  constructor(private http: HttpClient, private lessonService: LessonService, private userService: UserService, private courseService: CourseService, private authService: AuthService) { }

  // Get Edit Records For Course

  async getEditRecordsForCourse(courseID: string | null): Promise<EditRecord[]> {

    return new Promise<EditRecord[]>(async (resolve, reject) => {
      let records: Array<EditRecord> = [];

      await this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getAllCourseTitleChangedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let record: CourseTitleChangedRecord = {
                  newTitle: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("newTitle")
                    ]
                  ),
                  previousTitle: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf(
                      "previousTitle"
                    )
                    ]
                  ),
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 1,
                  typeOfEdit: 1,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllCourseLessonAddedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  course: "",
                  chunks: [],
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf(
                        "lessonAdded"
                      )
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let record: CourseLessonAddedRecord = {
                  lessonAdded: recordLesson,
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 1,
                  typeOfEdit: 2,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllCourseLessonRemovedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  course: "",
                  chunks: [],
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf(
                        "lessonRemoved"
                      )
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let record: CourseLessonRemovedRecord = {
                  lessonRemoved: recordLesson,
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 1,
                  typeOfEdit: 3,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllCourseLessonsReorderedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let record: CourseLessonsReorderedRecord = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 1,
                  typeOfEdit: 4,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllLessonTitleChangedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  chunks: [],
                  course: "",
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("lesson")
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let record: LessonTitleChangedRecord = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 2,
                  typeOfEdit: 1,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                  previousTitle: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf(
                      "previousTitle"
                    )
                    ]
                  ),
                  newTitle: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("newTitle")
                    ]
                  ),
                  lesson: recordLesson,
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllLessonChunkAddedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  chunks: [],
                  course: "",
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("lesson")
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let chunkAdded: Chunk = {
                  _id: "",
                  title: "",
                  lesson: "",
                  type: 0,
                };

                await this.lessonService
                  .getChunk(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf(
                        "chunkAdded"
                      )
                      ]
                    )
                  )
                  .then((chunk) => {
                    chunkAdded = chunk;
                  });

                let record: LessonChunkAddedRecord = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 2,
                  typeOfEdit: 2,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                  chunkAdded: chunkAdded,
                  lesson: recordLesson,
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllLessonChunkRemovedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  chunks: [],
                  course: "",
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("lesson")
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let chunkRemoved: Chunk = {
                  _id: "",
                  title: "",
                  lesson: "",
                  type: 0,
                };

                await this.lessonService
                  .getChunk(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf(
                        "chunkRemoved"
                      )
                      ]
                    )
                  )
                  .then((chunk) => {
                    chunkRemoved = chunk;
                  });

                let record: LessonChunkRemovedRecord = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 2,
                  typeOfEdit: 3,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                  chunkRemoved: chunkRemoved,
                  lesson: recordLesson,
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllLessonChunkEditedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  chunks: [],
                  course: "",
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("lesson")
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let chunkEdited: Chunk = {
                  _id: "",
                  title: "",
                  lesson: "",
                  type: 0,
                };

                await this.lessonService
                  .getChunk(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf(
                        "chunkEdited"
                      )
                      ]
                    )
                  )
                  .then((chunk) => {
                    chunkEdited = chunk;
                  });

                let record: LessonChunkEditedRecord = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 2,
                  typeOfEdit: 5,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                  chunkEdited: chunkEdited,
                  lesson: recordLesson,
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        this.http
          .get(environment.serverURL + "/getAllLessonChunksReorderedRecords", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(async (data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("course")
                  ]
                ) == courseID
              ) {
                let recordUser: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    recordUser = user;
                  });

                let recordCourse: Course = {
                  _id: "",
                  title: "",
                  level: "",
                  lessons: [],
                  ratings: [],
                };

                await this.courseService
                  .getCourse(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("course")
                      ]
                    )
                  )
                  .then((course) => {
                    recordCourse = course;
                  });

                let recordLesson: Lesson = {
                  _id: "",
                  title: "",
                  chunks: [],
                  course: "",
                };

                await this.lessonService
                  .getLesson(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("lesson")
                      ]
                    )
                  )
                  .then((lesson) => {
                    recordLesson = lesson;
                  });

                let record: LessonChunksReorderedRecord = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  typeOfRecord: 2,
                  typeOfEdit: 4,
                  course: recordCourse,
                  user: recordUser,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                  lesson: recordLesson,
                };

                records.push(record);
                records.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
            }
          });

        resolve(records);
      });
    });
  }

  // Get Edit Leaderboard

  async getEditLeaderboard(): Promise<User[]> {

    return new Promise<User[]>(async (resolve, reject) => {

      let users: Array<User> = [];

      await this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getAllUsers/", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe((data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              let user: User = {
                _id: String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("_id")
                  ]
                ),
                username: String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("username")
                  ]
                ),
                avatar: String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("avatar")
                  ]
                ),
                editXP: +String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("editXP")
                  ]
                ),
                learnXP: +String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("learnXP")
                  ]
                ),
              };

              users.push(user);
              users.sort((a, b) => b.editXP - a.editXP);
            }
          });

        resolve(users);
      });
    });
  }

  // Get Learn Leaderboard

  async getLearnLeaderboard(): Promise<User[]> {

    return new Promise<User[]>(async (resolve, reject) => {

      let users: Array<User> = [];

      await this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getAllUsers/", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe((data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              let user: User = {
                _id: String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("_id")
                  ]
                ),
                username: String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("username")
                  ]
                ),
                avatar: String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("avatar")
                  ]
                ),
                editXP: +String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("editXP")
                  ]
                ),
                learnXP: +String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("learnXP")
                  ]
                ),
              };

              users.push(user);
              users.sort((a, b) => b.learnXP - a.learnXP);
            }
          });

        resolve(users);
      });
    });
  }

  // Get Course Learn Records For User

  async getCourseLearnRecordsForUser(userID: string): Promise<CourseLearnRecord[]> {

    return new Promise<CourseLearnRecord[]>(async (resolve, reject) => {

      let records: Array<CourseLearnRecord> = [];

      await this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getAllCourseLearnRecords/", {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe((data) => {
            for (let i = 0; i < Object.values(data).length; i++) {
              if (
                String(
                  Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf("user")
                  ]
                ) == userID
              ) {
                let record: CourseLearnRecord = {
                  course: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("course")
                    ]
                  ),
                  user: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("user")
                    ]
                  ),
                  lessonsCompleted: [],
                  completed: Boolean(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("completed")
                    ]
                  ),
                };

                let lessonsCompleted = Object.values(Object.values(data)[i])[
                  Object.keys(Object.values(data)[i]).indexOf(
                    "lessonsCompleted"
                  )
                ] as any[];

                for (let i = 0; i < lessonsCompleted.length; i++) {
                  record.lessonsCompleted.push(lessonsCompleted[i]);
                }

                records.push(record);
              }
            }
          });

        resolve(records);
      });
    });
  }

  // Get Course Learn Record

  async getCourseLearnRecord(userID: string, courseID: string): Promise<CourseLearnRecord> {

    return new Promise<CourseLearnRecord>(async (resolve, reject) => {

      let record: CourseLearnRecord = {
        course: "",
        user: "",
        lessonsCompleted: [],
        completed: false,
      };

      await this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getCourseLearnRecord/", {
            params: { courseID: courseID, userID: userID },
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe((data) => {
            record.course = String(
              Object.values(data)[Object.keys(data).indexOf("course")]
            );
            record.user = String(
              Object.values(data)[Object.keys(data).indexOf("user")]
            );
            record.completed = Boolean(
              Object.values(data)[Object.keys(data).indexOf("completed")]
            );

            let lessonsCompleted = Object.values(data)[
              Object.keys(data).indexOf("lessonsCompleted")
            ] as any[];

            for (let i = 0; i < lessonsCompleted.length; i++) {
              record.lessonsCompleted.push(lessonsCompleted[i]);
            }
          });

        resolve(record);
      });
    });
  }

  // Create Course Learn Record

  async createCourseLearnRecord(userID: String, courseID: String) {

    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/createCourseLearnRecord",
          {
            user: userID,
            course: courseID,
            lessonsCompleted: [],
            rating: 0,
            completed: false,
          },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }

  // Delete Course Learn Record

  async deleteCourseLearnRecord(userID: String, courseID: String) {

    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/deleteCourseLearnRecord",
          { userID: userID, courseID: courseID },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }

  // Complete Lesson

  async completeLesson(userID: String, courseID: String, lessonCompleted: String, completed: Boolean) {
    
    if (completed) {
      this.userService.updateUserLearnXP(userID, 30);
    }

    this.userService.updateUserLearnXP(userID, 5);

    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/updateCourseLearnRecord",
          {
            userID: userID,
            courseID: courseID,
            lessonCompleted: lessonCompleted,
            completed: completed,
          },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }
}

