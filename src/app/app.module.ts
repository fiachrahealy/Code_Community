import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursesComponent } from './courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { ColourSchemeComponent } from './colour-scheme/colour-scheme.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessagesComponent } from './messages/messages.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { PeopleComponent } from './people/people.component';
import { CommonModule } from '@angular/common';
import { CourseService } from 'services/course.service';
import { UserService } from 'services/user.service';
import { ColourSchemeService } from 'services/colour-scheme.service';
import { FriendService } from 'services/friend.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { LessonCreateComponent } from './lesson-create/lesson-create.component';
import { LessonService } from 'services/lesson.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { PostService } from 'services/post.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { HistoryComponent } from './history/history.component';
import { LoadingComponent } from './loading/loading.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { FriendRequestListComponent } from './friend-request-list/friend-request-list.component';
import { RecordService } from 'services/record.service';
import { RatingComponent } from './rating/rating.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LandingComponent,
    NavbarComponent,
    CoursesComponent,
    SidebarComponent,
    ProfileComponent,
    CourseViewComponent,
    CourseEditComponent,
    ColourSchemeComponent,
    LessonViewComponent,
    LessonEditComponent,
    MessagesComponent,
    NewsfeedComponent,
    NavbarComponent,
    LeaderboardsComponent,
    PeopleComponent,
    CodeEditorComponent,
    LessonCreateComponent,
    ConfirmComponent,
    HistoryComponent,
    LoadingComponent,
    MessagesListComponent,
    FriendRequestListComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatProgressBarModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FontAwesomeModule
  ],
  providers: [
    CourseService,
    UserService,
    ColourSchemeService,
    FriendService,
    LessonService,
    DataRefreshService,
    PostService,
    RecordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
