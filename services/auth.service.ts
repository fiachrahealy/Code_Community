import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(private router: Router, private http: HttpClient, private fireauth: AngularFireAuth) {

    // Fire Auth State

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

  }

  // Is Logged In

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Sign In

  async signIn(email: string, password: string) {

    return new Promise<any>((resolve, reject) => {

      this.fireauth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.fireauth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['courses']);
              resolve({ success: true });
            }
          });
        })
        .catch((error) => {
          reject(error);
        })

    });
  }

  // Sign Out

  async signOut() {

    this.fireauth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      });

  }

  // Get Current User ID

  async getCurrentUserID(): Promise<string> {

    return new Promise<string>(async (resolve, reject) => {

      await this.getRequestToken()
        .then((token) => {
          this.http.get(environment.serverURL + '/getCurrentUserID/', { headers: new HttpHeaders().set('token', token) }).subscribe(data => {
            resolve(Object.values(data)[Object.keys(data).indexOf("id")]);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

  }

  // Get Request Token

  async getRequestToken(): Promise<string> {

    return new Promise<string>((resolve, reject) => {

      this.fireauth.authState.subscribe((signedInUser) => {
        if (signedInUser) {
          signedInUser.getIdToken().then((token) => {
            resolve(token);
          });
        }
      });

    });

  }

}