import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chunk } from 'interfaces/chunk.interface';
import { Lesson } from 'interfaces/lesson.interface';
import { UserService } from './user.service';
import { environment } from '../src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private userService: UserService, private http: HttpClient, private authService: AuthService) { }

  // Get Lesson

  async getLesson(id: string | null): Promise<Lesson> {

    return new Promise<Lesson>(async (resolve, reject) => {

      let lesson: Lesson = {
        _id: "",
        title: "",
        course: "",
        chunks: []
      };

      await this.authService.getRequestToken()
        .then((token) => {
          this.http.get(environment.serverURL + '/getLesson/' + id, {
            headers: new HttpHeaders().set('token', token)
          }).subscribe(async data => {

            lesson._id = Object.values(data)[Object.keys(data).indexOf("_id")];
            lesson.title = Object.values(data)[Object.keys(data).indexOf("title")];
            lesson.course = Object.values(data)[Object.keys(data).indexOf("course")];

            for (let i = 0; i < Object.values(data)[Object.keys(data).indexOf("chunks")].length; i++) {

              await this.getChunk(Object.values(data)[Object.keys(data).indexOf("chunks")][i])
                .then((chunk) => {
                  lesson.chunks.push(chunk);
                })

            }

          });
        });

      resolve(lesson);

    });

  }

  // Update Lesson

  async updateLesson(previousLesson: Lesson, lesson: Lesson, userID: String, chunksReordered: Boolean, files: Map<number, any>) {

    await this.authService.getRequestToken()
      .then(async (token) => {

        let timestamp = new Date();

        if (previousLesson.title != lesson.title) {

          await this.http.post(environment.serverURL + '/updateLessonTitle', {
            'newTitle': lesson.title,
            'lessonID': lesson._id
          }, {
            headers: new HttpHeaders().set('token', token)
          }).toPromise()
            .then(() => {
              this.http.post(environment.serverURL + '/createLessonTitleChangedRecord', {
                'course': lesson.course,
                'lesson': previousLesson._id,
                'user': userID,
                'timestamp': timestamp,
                'previousTitle': previousLesson.title,
                'newTitle': lesson.title
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise();
              this.userService.updateUserEditXP(userID, 3);
            });

        }

        for (let i = 0; i < lesson.chunks.length; i++) {

          if (lesson.chunks[i]._id.includes("unsaved")) {

            if (lesson.chunks[i].type == 1) {

              await this.http.post(environment.serverURL + '/createCodeChunk', {
                'title': lesson.chunks[i].title,
                'lesson': lesson._id,
                'code': lesson.chunks[i].code,
                'language': lesson.chunks[i].language
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkAddedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkAdded': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 5);
                  }
                });

            }
            if (lesson.chunks[i].type == 2) {

              const formData = new FormData();
              formData.append('title', lesson.chunks[i].title);
              formData.append('lesson', lesson._id);
              formData.append('file', files.get(i));

              await this.http.post(environment.serverURL + '/createImageChunk', formData, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkAddedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkAdded': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 5);
                  }
                });

            }
            if (lesson.chunks[i].type == 3) {

              await this.http.post(environment.serverURL + '/createTextChunk', {
                'title': lesson.chunks[i].title,
                'lesson': lesson._id,
                'text': lesson.chunks[i].text,
                'fontSize': lesson.chunks[i].fontSize
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkAddedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkAdded': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 5);
                  }
                });

            }
            if (lesson.chunks[i].type == 4) {

              await this.http.post(environment.serverURL + '/createQuizChunk', {
                'title': lesson.chunks[i].title,
                'lesson': lesson._id,
                'question': lesson.chunks[i].question,
                'answers': lesson.chunks[i].answers,
                'correctAnswer': lesson.chunks[i].correctAnswer
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkAddedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkAdded': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 5);
                  }
                });

            }

          } else {

            let previousIndex = 0;

            for (let j = 0; j < previousLesson.chunks.length; j++) {

              if (previousLesson.chunks[j]._id == lesson.chunks[i]._id) {

                previousIndex = j;

              }

            }

            if (lesson.chunks[i].type == 1 && (lesson.chunks[i].title != previousLesson.chunks[previousIndex].title || lesson.chunks[i].code != previousLesson.chunks[previousIndex].code || lesson.chunks[i].language != previousLesson.chunks[previousIndex].language)) {

              await this.http.post(environment.serverURL + '/updateCodeChunk', {
                'chunkID': lesson.chunks[i]._id,
                'title': lesson.chunks[i].title,
                'lesson': lesson._id,
                'code': lesson.chunks[i].code,
                'language': lesson.chunks[i].language
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkEditedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkEdited': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 3);
                  }
                });

            }
            if (lesson.chunks[i].type == 2 && (lesson.chunks[i].title != previousLesson.chunks[previousIndex].title || files.has(i))) {

              const formData = new FormData();
              formData.append('chunkID', lesson.chunks[i]._id);
              formData.append('title', lesson.chunks[i].title);
              formData.append('lesson', lesson._id);
              formData.append('file', files.get(i));
              formData.append('originalFile', lesson.chunks[i].file);

              await this.http.post(environment.serverURL + '/updateImageChunk', formData, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkEditedRecord', {
                      'course': lesson.course,
                      'chunk': lesson.chunks[i]._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkEdited': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 3);
                  }
                });

            }
            if (lesson.chunks[i].type == 3 && (lesson.chunks[i].title != previousLesson.chunks[previousIndex].title || lesson.chunks[i].text != previousLesson.chunks[previousIndex].text || lesson.chunks[i].fontSize != previousLesson.chunks[previousIndex].fontSize)) {

              await this.http.post(environment.serverURL + '/updateTextChunk', {
                'chunkID': lesson.chunks[i]._id,
                'title': lesson.chunks[i].title,
                'lesson': lesson._id,
                'text': lesson.chunks[i].text,
                'fontSize': lesson.chunks[i].fontSize
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkEditedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkEdited': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 3);
                  }
                });

            }
            if (lesson.chunks[i].type == 4 && (lesson.chunks[i].title != previousLesson.chunks[previousIndex].title || lesson.chunks[i].question != previousLesson.chunks[previousIndex].question || lesson.chunks[i].correctAnswer != previousLesson.chunks[previousIndex].correctAnswer || lesson.chunks[i].answers[0] != previousLesson.chunks[previousIndex].answers[0] || lesson.chunks[i].answers[1] != previousLesson.chunks[previousIndex].answers[1] || lesson.chunks[i].answers[2] != previousLesson.chunks[previousIndex].answers[2] || lesson.chunks[i].answers[3] != previousLesson.chunks[previousIndex].answers[3])) {

              await this.http.post(environment.serverURL + '/updateQuizChunk', {
                'chunkID': lesson.chunks[i]._id,
                'title': lesson.chunks[i].title,
                'lesson': lesson._id,
                'question': lesson.chunks[i].question,
                'answers': lesson.chunks[i].answers,
                'correctAnswer': lesson.chunks[i].correctAnswer
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise()
                .then(async (chunk) => {
                  if (chunk != undefined) {
                    lesson.chunks[i]._id = String(Object.values(chunk)[Object.keys(chunk).indexOf("_id")]);
                    await this.http.post(environment.serverURL + '/createLessonChunkEditedRecord', {
                      'course': lesson.course,
                      'lesson': lesson._id,
                      'user': userID,
                      'timestamp': timestamp,
                      'chunkEdited': lesson.chunks[i]._id
                    }, {
                      headers: new HttpHeaders().set('token', token)
                    }).toPromise();
                    this.userService.updateUserEditXP(userID, 3);
                  }
                });

            }

          }

        }

        for (let i = 0; i < previousLesson.chunks.length; i++) {

          let stillInLesson = false;

          for (let j = 0; j < lesson.chunks.length; j++) {

            if (previousLesson.chunks[i]._id == lesson.chunks[j]._id) {

              stillInLesson = true;
              break;

            }

          }

          if (!stillInLesson) {

            await this.http.post(environment.serverURL + '/createLessonChunkRemovedRecord', {
              'course': lesson.course,
              'lesson': previousLesson._id,
              'user': userID,
              'timestamp': timestamp,
              'chunkRemoved': previousLesson.chunks[i]._id
            }, {
              headers: new HttpHeaders().set('token', token)
            }).toPromise();
            this.userService.updateUserEditXP(userID, 5);

          }

        }

        let chunksIDsNew: String[] = [];
        let chunksIDsPrevious: String[] = [];

        for (let i = 0; i < lesson.chunks.length; i++) {

          chunksIDsNew.push(lesson.chunks[i]._id);

        }

        for (let i = 0; i < previousLesson.chunks.length; i++) {

          chunksIDsPrevious.push(previousLesson.chunks[i]._id);

        }

        await this.http.post(environment.serverURL + '/updateLessonChunks', {
          'chunks': chunksIDsNew,
          'lessonID': lesson._id
        }, {
          headers: new HttpHeaders().set('token', token)
        }).toPromise()
          .then(async () => {
            if (chunksReordered) {
              await this.http.post(environment.serverURL + '/createLessonChunksReorderedRecord', {
                'course': lesson.course,
                'lesson': previousLesson._id,
                'user': userID,
                'timestamp': timestamp,
                'newChunks': chunksIDsNew,
                'previousChunks': chunksIDsPrevious
              }, {
                headers: new HttpHeaders().set('token', token)
              }).toPromise();
              this.userService.updateUserEditXP(userID, 3);
            }
          });

      });

  }

  // Get Chunk

  async getChunk(id: string | null): Promise<Chunk> {

    return new Promise<Chunk>(async (resolve, reject) => {

      await this.authService.getRequestToken()
        .then(async (token) => {

          let chunk: any = {};

          await this.http.get(environment.serverURL + '/getTextChunk/' + id, {
            headers: new HttpHeaders().set('token', token)
          }).subscribe(data => {

            if (data != null) {

              chunk._id = Object.values(data)[Object.keys(data).indexOf("_id")];
              chunk.title = Object.values(data)[Object.keys(data).indexOf("title")];
              chunk.type = 3;
              chunk.lesson = Object.values(data)[Object.keys(data).indexOf("lesson")];
              chunk.text = Object.values(data)[Object.keys(data).indexOf("text")];
              chunk.fontSize = Object.values(data)[Object.keys(data).indexOf("fontSize")];

            }

          });

          await this.http.get(environment.serverURL + '/getCodeChunk/' + id, {
            headers: new HttpHeaders().set('token', token)
          }).subscribe(data => {

            if (data != null) {

              chunk._id = Object.values(data)[Object.keys(data).indexOf("_id")];
              chunk.title = Object.values(data)[Object.keys(data).indexOf("title")];
              chunk.type = 1;
              chunk.lesson = Object.values(data)[Object.keys(data).indexOf("lesson")];
              chunk.code = Object.values(data)[Object.keys(data).indexOf("code")];
              chunk.language = Object.values(data)[Object.keys(data).indexOf("language")];

            }

          });

          await this.http.get(environment.serverURL + '/getQuizChunk/' + id, {
            headers: new HttpHeaders().set('token', token)
          }).subscribe(data => {

            if (data != null) {

              chunk._id = Object.values(data)[Object.keys(data).indexOf("_id")];
              chunk.title = Object.values(data)[Object.keys(data).indexOf("title")];
              chunk.type = 4;
              chunk.lesson = Object.values(data)[Object.keys(data).indexOf("lesson")];
              chunk.question = Object.values(data)[Object.keys(data).indexOf("question")];
              chunk.answers = Object.values(data)[Object.keys(data).indexOf("answers")];
              chunk.correctAnswer = Object.values(data)[Object.keys(data).indexOf("correctAnswer")];

            }

          });

          this.http.get(environment.serverURL + '/getImageChunk/' + id, {
            headers: new HttpHeaders().set('token', token)
          }).subscribe(data => {

            if (data != null) {

              chunk._id = Object.values(data)[Object.keys(data).indexOf("_id")];
              chunk.title = Object.values(data)[Object.keys(data).indexOf("title")];
              chunk.type = 2;
              chunk.lesson = Object.values(data)[Object.keys(data).indexOf("lesson")];
              chunk.file = Object.values(data)[Object.keys(data).indexOf("file")];

            }

          });

          resolve(chunk);

        });

    });

  }

}
