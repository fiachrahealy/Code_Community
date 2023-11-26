import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { LessonViewComponent } from './lesson-view.component';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;
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
      declarations: [LessonViewComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('completeLesson()', () => {
    it('should make a POST request to /updateCourseLearnRecord and a GET request to /getLesson', () => {

      component.completeLesson();

      const req1 = httpMock.expectOne('/updateCourseLearnRecord');

      expect(req1.request.method).toEqual('POST');

      const req2 = httpMock.expectOne('/getLesson/' + undefined);

      expect(req2.request.method).toEqual('GET');

    });

  });

});
