import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColourSchemeService {

  constructor() { }

  // Get Current Colour Scheme

  getColourScheme(): Number {

    switch (window.getComputedStyle(document.documentElement).getPropertyValue('--dark-colour')) {
      case '#AA3939': {
        return 1;
      }
      case '#b85800': {
        return 2;
      }
      case '#466F19': {
        return 3;
      }
      case '#28536C': {
        return 4;
      }
      case '#3d1255': {
        return 5;
      }
      default: {
        return 5;
      }
    }
  }

  // Change Colour Scheme

  changeColourScheme(colour: Number) {

    switch (colour) {
      case 1: {
        document.documentElement.style.setProperty('--dark-colour', '#AA3939');
        document.documentElement.style.setProperty('--darkest-colour', '#801616');
        document.documentElement.style.setProperty('--light-colour', '#D46A6A');
        localStorage.setItem('colour', '1');
        break;
      }
      case 2: {
        document.documentElement.style.setProperty('--dark-colour', '#b85800');
        document.documentElement.style.setProperty('--darkest-colour', '#7a3d04');
        document.documentElement.style.setProperty('--light-colour', '#FFAE64');
        localStorage.setItem('colour', '2');
        break;
      }
      case 3: {
        document.documentElement.style.setProperty('--dark-colour', '#466F19');
        document.documentElement.style.setProperty('--darkest-colour', '#2A4C05');
        document.documentElement.style.setProperty('--light-colour', '#87B15A');
        localStorage.setItem('colour', '3');
        break;
      }
      case 4: {
        document.documentElement.style.setProperty('--dark-colour', '#28536C');
        document.documentElement.style.setProperty('--darkest-colour', '#113951');
        document.documentElement.style.setProperty('--light-colour', '#6F8FA2');
        localStorage.setItem('colour', '4');
        break;
      }
      case 5: {
        document.documentElement.style.setProperty('--dark-colour', '#3d1255');
        document.documentElement.style.setProperty('--darkest-colour', '#1A0127');
        document.documentElement.style.setProperty('--light-colour', '#c1a4d1');
        localStorage.setItem('colour', '5');
        break;
      }
      default: {
        document.documentElement.style.setProperty('--dark-colour', '#3d1255');
        document.documentElement.style.setProperty('--darkest-colour', '#1A0127');
        document.documentElement.style.setProperty('--light-colour', '#c1a4d1');
        localStorage.setItem('colour', '5');
        break;
      }
    }

  }

}