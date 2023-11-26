import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
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
      declarations: [MessagesComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendMessage()', () => {
    it('should make POST requests to /deleteUnopenedMessage and /sendMessage and a GET request to /getMessagesForUsers', () => {

      component.sendMessage();

      const req1 = httpMock.expectOne('/deleteUnopenedMessage');

      expect(req1.request.method).toEqual('POST');

      const req2 = httpMock.expectOne('/sendMessage');

      expect(req2.request.method).toEqual('POST');

      const req3 = httpMock.expectOne('/getMessagesForUsers?user1=&user2=undefined');

      expect(req3.request.method).toEqual('GET');

    });

  });

  describe('getMessages()', () => {
    it('should make a GET request to /getMessagesForUsers', () => {

      const req1 = httpMock.expectOne('/getMessagesForUsers?user1=&user2=undefined');

      expect(req1.request.method).toEqual('GET');

    });

  });


});
