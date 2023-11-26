import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { LandingComponent } from './landing/landing.component';
import { LoggedInGuardService as LoggedInGuard } from '../../services/logged-in-guard.service';
import { LoggedOutGuardService as LoggedOutGuard } from '../../services/logged-out-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { PeopleComponent } from './people/people.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: { title: 'Login / Sign Up' },
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data: { title: 'Courses' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'leaderboards',
    component: LeaderboardsComponent,
    data: { title: 'Leaderboards' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    data: { title: 'People' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'people/:username',
    component: ProfileComponent,
    data: { title: 'Profile' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'newsfeed',
    component: NewsfeedComponent,
    data: { title: 'Newsfeed' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'courses/view/:course',
    component: CourseViewComponent,
    data: { title: 'View Course' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'courses/view/:course/:lesson',
    component: LessonViewComponent,
    data: { title: 'View Lesson' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'courses/edit/:course',
    component: CourseEditComponent,
    data: { title: 'Edit Course' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'courses/edit/:course/:lesson',
    component: LessonEditComponent,
    data: { title: 'Edit Lesson' },
    canActivate: [LoggedInGuard]
  },
  { path: '**', redirectTo: '/courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }