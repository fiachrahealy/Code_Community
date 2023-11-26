import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
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
      declarations: [NavbarComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('pullFriendData()', () => {
    it('should make a GET request to /getAllFriendRequests', () => {

      component.pullFriendData();

      const req1 = httpMock.expectOne('/getAllFriendRequests');

      expect(req1.request.method).toEqual('GET');

    });

  });

  describe('pullMessageData()', () => {
    it('should make a GET request to /getUnopenedMessagesForUser', () => {

      component.pullMessageData();

      const req1 = httpMock.expectOne('/getUnopenedMessagesForUser/');

      expect(req1.request.method).toEqual('GET');

    });

  });
});
