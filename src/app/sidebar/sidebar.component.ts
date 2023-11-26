import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'interfaces/course.interface';
import { CourseService } from 'services/course.service';
import { faGraduationCap, faCrown, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  courses: Array<Course> = [];

  faGraduationCap = faGraduationCap;
  faCrown = faCrown;
  faNewspaper = faNewspaper;
  faUsers = faUsers;

  constructor(public router: Router) { }

  ngOnInit() { }
}
