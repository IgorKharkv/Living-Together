import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import databases from '../assets/databases.json';
import {Database} from './models/database';
import {PassageService} from './services/passage.service';
import {Observable} from 'rxjs';
import {Passage} from './models/passage';
import {AuPassage} from './models/au_passage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private passageService: PassageService) {}

  ngOnInit(): void { this.passageService.initPassages(); }

  public getDatabases(): Database[] { return databases; }

  public getPassages(name: string): Observable<Passage[] | AuPassage[]> {
    return this.passageService.passagesDictionary[name];
  }
}
