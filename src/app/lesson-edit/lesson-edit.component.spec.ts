import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LessonEditComponent } from './lesson-edit.component';

describe('LessonEditComponent', () => {
  let component: LessonEditComponent;
  let fixture: ComponentFixture<LessonEditComponent>;
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
        FormsModule
      ],
      declarations: [LessonEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deletChunk()', () => {
    it('should remove chunk from lesson\'s chunk array', () => {

      component.lesson.chunks = [{ _id: "chunkID1" }, { _id: "chunkID2" }, { _id: "chunkID3" }, { _id: "chunkID4" }, { _id: "chunkID5" }]
      component.deleteChunk(2);

      let chunk3Present = false;
      let chunk4Present = false;

      for (let i = 0; i < component.lesson.chunks.length; i++) {

        if (component.lesson.chunks[i]._id == "chunkID3") {

          chunk3Present = true;

        }

        if (component.lesson.chunks[i]._id == "chunkID4") {

          chunk4Present = true;

        }


      }

      expect(chunk3Present).toEqual(false);
      expect(chunk4Present).toEqual(true);

    });

  });

  describe('titleChange()', () => {
    it('should update unsavedChangesTitle to true if title has been changed', () => {

      component.previousLesson.title = "This is the old title";
      component.lesson.title = "This is the new title";

      component.titleChange();

      expect(component.unsavedChangesTitle).toEqual(true);

    });

  });

  describe('addComponent(X)', () => {
    it('should add chunk of type X to chunk array', () => {

      component.lesson.chunks.length = 5;

      component.addComponent(3);

      expect(component.lesson.chunks.length).toEqual(6);

    });

  });

  describe('saveChanges()', () => {
    it('should make a POST request to /updateLessonChunks ', () => {

      component.saveChanges();

      const req1 = httpMock.expectOne('/updateLessonChunks');

      expect(req1.request.method).toEqual('POST');

    });

  });

});
