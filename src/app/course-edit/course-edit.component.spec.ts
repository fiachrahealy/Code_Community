import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { CourseEditComponent } from './course-edit.component';

describe('CourseEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [CourseEditComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveChanges()', () => {
    it('should make a POST request to /updateCourseLessons', () => {

      component.saveChanges();

      const req = httpMock.expectOne('/updateCourseLessons');

      expect(req.request.method).toEqual('POST');

    });

  });

  describe('counterPosStar(X)', () => {
    it('should return an undefined Array of length X', () => {

      let result = component.counterPosStar(4);

      expect(result).toEqual([undefined!, undefined!, undefined!, undefined!])

    });

  });

  describe('counterNegStar(X)', () => {
    it('should return an undefined Array of length 5-X', () => {

      let result = component.counterNegStar(4);

      expect(result).toEqual([undefined!])

    });

  });

  describe('showEditBtn(X)', () => {
    it('should return false if input ID includes the word unsaved', () => {

      let result = component.showEditBtn("thisisanunsavedlesson");

      expect(result).toEqual(false);

    });

  });

  describe('titleChange()', () => {
    it('should update unsavedChangesTitle to true if title has been changed', () => {

      component.previousCourse.title = "This is the old title";
      component.course.title = "This is the new title";

      component.titleChange();

      expect(component.unsavedChangesTitle).toEqual(true);

    });

  });

  describe('deleteLesson()', () => {
    it('should remove lesson from courses\'s lesson array', () => {

      component.course.lessons = [{ _id: "lessonID1", title: "", course: "", chunks: [] }, { _id: "lessonID2", title: "", course: "", chunks: [] }, { _id: "lessonID3", title: "", course: "", chunks: [] }, { _id: "lessonID4", title: "", course: "", chunks: [] }, { _id: "lessonID5", title: "", course: "", chunks: [] }]

      component.deleteLesson(2);

      let lesson3Present = false;
      let lesson4Present = false;

      for (let i = 0; i < component.course.lessons.length; i++) {

        if (component.course.lessons[i]._id == "lessonID3") {

          lesson3Present = true;

        }

        if (component.course.lessons[i]._id == "lessonID4") {

          lesson4Present = true;

        }


      }

      expect(lesson3Present).toEqual(false);
      expect(lesson4Present).toEqual(true);

    });

  });

});
