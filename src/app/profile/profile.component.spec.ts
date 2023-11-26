import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
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
      declarations: [ProfileComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
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
