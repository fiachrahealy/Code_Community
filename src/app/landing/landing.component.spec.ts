import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [LandingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login()', () => {
    it('should make a POST request to /loginUser ', () => {

      component.login();

      const req1 = httpMock.expectOne('/loginUser');

      expect(req1.request.method).toEqual('POST');

    });

  });

  describe('signup()', () => {
    it('should make a POST request to /signup if username is minimum length and passwords match', () => {

      component.userSignup = { username: "username", email: "email", password: "password", avatar: "avatar", cpassword: "password" }

      component.signUp();

      const req1 = httpMock.expectOne('/signupUser');

      expect(req1.request.method).toEqual('POST');

    });

  });

});
