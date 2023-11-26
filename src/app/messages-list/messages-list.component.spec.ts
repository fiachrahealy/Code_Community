import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessagesListComponent } from './messages-list.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';


describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;
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
      declarations: [MessagesListComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hasUnopenedMessage(X)', () => {
    it('should return true X is present in unOpenedMessages array', () => {

      component.unopenedMessageUsers = [{ _id: "user1", username: "username", avatar: "avatar", editXP: 0, learnXP: 0 }]

      let result = component.hasUnopenedMessage("user1");

      expect(result).toEqual(true)

    });

  });

  describe('pullMessageData()', () => {
    it('should make a GET request to /getAllFriends', () => {

      component.pullMessageData();

      const req1 = httpMock.expectOne('/getAllFriends');

      expect(req1.request.method).toEqual('GET');

    });

  });

});
