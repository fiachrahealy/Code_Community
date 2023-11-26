import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
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
      declarations: [PeopleComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendFriendRequest()', () => {
    it('should make a POST request to /sendFriendRequest', () => {

      component.sendFriendRequest("user1", "user2");

      const req = httpMock.expectOne('/sendFriendRequest');

      expect(req.request.method).toEqual('POST');

    });

  });

  describe('deleteFriend()', () => {
    it('should make a POST request to /deleteFriend', () => {

      component.deleteFriend("user1", "user2");

      const req = httpMock.expectOne('/deleteFriend');

      expect(req.request.method).toEqual('POST');

    });

  });


  describe('pullFriendData()', () => {
    it('should make a GET request to /getAllUsers', () => {

      component.pullFriendData();

      const req = httpMock.expectOne('/getAllUsers/');

      expect(req.request.method).toEqual('GET');

    });

  });

  describe('hasASentFriendRequest(X)', () => {
    it('should return true X is present in friendRequestUsers array', () => {

      component.friendRequestUsers = [{ _id: "user1", username: "username", avatar: "avatar", editXP: 0, learnXP: 0 }]

      let result = component.hasASentFriendRequest("user1");

      expect(result).toEqual(true)

    });

  });

  describe('isFriend(X)', () => {
    it('should return true X is present in friendUsers array', () => {

      component.friendUsers = [{ _id: "user1", username: "username", avatar: "avatar", editXP: 0, learnXP: 0 }]

      let result = component.isFriend("user1");

      expect(result).toEqual(true)

    });

  });


});
