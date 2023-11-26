import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { FriendRequestListComponent } from './friend-request-list.component';

describe('FriendRequestListComponent', () => {
  let component: FriendRequestListComponent;
  let fixture: ComponentFixture<FriendRequestListComponent>;
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
      declarations: [FriendRequestListComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addFriend()', () => {
    it('should make a POST request to /addFriend and a GET request to /getAllFriendRequests', () => {

      component.addFriend("user1", "user2");

      const req1 = httpMock.expectOne('/addFriend');

      expect(req1.request.method).toEqual('POST');

      const req2 = httpMock.expectOne('/getAllFriendRequests');

      expect(req2.request.method).toEqual('GET');

    });

  });

  describe('deleteFriendRequest()', () => {
    it('should make a POST request to /deleteFriendRequest and a GET request to /getAllFriendRequests', () => {

      component.deleteFriendRequest("user1", "user2");

      const req1 = httpMock.expectOne('/deleteFriendRequest');

      expect(req1.request.method).toEqual('POST');

      const req2 = httpMock.expectOne('/getAllFriendRequests');

      expect(req2.request.method).toEqual('GET');

    });

  });

});
