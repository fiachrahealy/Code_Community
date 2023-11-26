import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { ColourSchemeService } from 'services/colour-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn: Boolean = false;

  constructor(private colourSchemeService: ColourSchemeService, public router: Router, private authService: AuthService) { }

  ngOnInit() {

    if (localStorage.getItem('colour')) {

      this.colourSchemeService.changeColourScheme(JSON.parse(localStorage.getItem('colour') || '{}'));

    }
  }

  // Change Of Routes

  async changeOfRoutes() {

    this.loggedIn = await this.authService.isLoggedIn;

  }


}