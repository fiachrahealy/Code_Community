import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
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
      declarations: [CoursesComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  describe('startCourse()', () => {
    it('should make a POST request to /createCourseLearnRecord and GET requests to /getCourse and /getAllCourseLearnRecords', () => {

      component.startCourse("courseID");

      const req1 = httpMock.expectOne('/createCourseLearnRecord');

      expect(req1.request.method).toEqual('POST');

      const req2 = httpMock.expectOne('/getAllCourses/');

      expect(req2.request.method).toEqual('GET');

      const req3 = httpMock.expectOne('/getAllCourseLearnRecords/');

      expect(req3.request.method).toEqual('GET');

    });

  });

  describe('hasACourseRecord()', () => {
    it('should return true if course record exists for course', () => {

      component.records = [{
        course: 'courseID',
        user: '',
        lessonsCompleted: ["lessonID"],
        completed: false
      }];

      let result = component.hasACourseRecord("courseID");

      expect(result).toEqual(true);

    });

  });

  describe('hasCompletedCourse()', () => {
    it('should return true if course is completed', () => {

      component.records = [{
        course: 'courseID',
        user: '',
        lessonsCompleted: ["lessonID"],
        completed: true
      }];

      let result = component.hasCompletedCourse("courseID");

      expect(result).toEqual(true);

    });

  });


});
