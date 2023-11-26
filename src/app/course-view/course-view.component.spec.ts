import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { CourseViewComponent } from './course-view.component';

describe('CourseViewComponent', () => {
  let component: CourseViewComponent;
  let fixture: ComponentFixture<CourseViewComponent>;
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
      declarations: [CourseViewComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('resetCourse()', () => {
    it('should make a POST request to /deleteCourseLearnRecord and a GET request to /getCourse', () => {

      component.resetCourse();

      const req1 = httpMock.expectOne('/deleteCourseLearnRecord');

      expect(req1.request.method).toEqual('POST');

      const req2 = httpMock.expectOne('/getCourse/' + undefined);

      expect(req2.request.method).toEqual('GET');

    });

  });

  describe('isCompleted()', () => {
    it('should return true if lesson exists in record\'s lessonsCompleted array', () => {

      component.record = {
        course: '',
        user: '',
        lessonsCompleted: ["lessonID"],
        completed: false
      };

      let result = component.isCompleted("lessonID");

      expect(result).toEqual(true);

    });

  });

  describe('isUnlocked()', () => {
    it('should return true if lesson does not exist in record\'s lessonsCompleted array and is one of the first 4 lessons on the list', () => {

      component.record = {
        course: '',
        user: '',
        lessonsCompleted: [],
        completed: false
      };

      component.course.lessons = [{ _id: "lessonID1", title: "", course: "", chunks: [] }, { _id: "lessonID2", title: "", course: "", chunks: [] }, { _id: "lessonID3", title: "", course: "", chunks: [] }, { _id: "lessonID4", title: "", course: "", chunks: [] }, { _id: "lessonID5", title: "", course: "", chunks: [] }]

      let resultTrue = component.isUnlocked("lessonID1");

      expect(resultTrue).toEqual(true);

      let resultFalse = component.isUnlocked("lessonID5");

      expect(resultFalse).toEqual(false);

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


});
