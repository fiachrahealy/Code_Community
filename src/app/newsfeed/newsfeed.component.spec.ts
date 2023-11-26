import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsfeedComponent } from './newsfeed.component';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [NewsfeedComponent]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writePost()', () => {
    it('should make a POST request to /createPost', () => {

      component.writePost();

      const req = httpMock.expectOne('/createPost');

      expect(req.request.method).toEqual('POST');

    });

  });

});
