import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import databases from '../assets/data.json';
import {Database} from './models/database';
import {PassageService} from './services/passage.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private passageService: PassageService) {
  }

  getDatabases(): Database[] {
    return databases;
  }

  ngOnInit(): void {
    this.passageService.init();
  }

  getPassages(name: string): Observable<any[]> {
    return this.passageService.passagesDictionary[name];
  }
}
