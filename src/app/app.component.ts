import {Component, ViewEncapsulation} from '@angular/core';
import data from '../assets/data.json';
import {Database} from './models/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  getDatabases(): Database[] {
    return data;
  }
}
