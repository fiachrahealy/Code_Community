import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { environment } from '../../environments/environment';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  userLogin: any = {};
  userSignup: any = {};
  loginForm: any;
  loginError: String | undefined;
  signupError: String | undefined;
  avatar: any;
  loading: Boolean = false;

  constructor(private authService: AuthService, private dataRefreshService: DataRefreshService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  // Signup

  signUp() {

    this.loading = true;
    if (this.userSignup.password != this.userSignup.cpassword) {
      this.loading = false;
      this.signupError = "Passwords do not Match"
    }
    else if (this.userSignup.username.length < 8) {
      this.loading = false;
      this.signupError = "Username must be at least 8 characters in length"
    }
    else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.userSignup.email, this.userSignup.password)
        .then((userCredential) => {
          const formData = new FormData();
          formData.append('username', (this.userSignup.username).toLowerCase());
          formData.append('email', this.userSignup.email);
          formData.append('avatar', this.avatar);
          this.http.post(environment.serverURL + '/signupUser', formData).toPromise()
            .then(() => {
              this.userLogin = this.userSignup;
              this.signIn(this.userSignup.email, this.userSignup.password);
            })
            .catch((error) => {
              this.loading = false;
              this.signupError = error;
            });
        })
        .catch((error) => {
          this.loading = false;
          this.signupError = error.message;
        });
    }
  }

  // Sign In

  signIn(email: string, password: string) {

    this.authService.signIn(email, password)
      .then(() => {
        this.dataRefreshService.refreshNavUser();
        this.router.navigate(['courses']);
      })
      .catch((error) => {
        this.loginError = error;
      });

  }

  // File Upload

  fileUpload(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatar = file;
    }

    (<HTMLInputElement>document.getElementById("avatar")).value = (<HTMLInputElement>document.getElementById("file-upload")).value.split('\\')[2];
  }

}