import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import databases from '../../assets/databases.json';
import errorsTranslator from '../../assets/error_messages_translate.json';
import {map} from 'rxjs/operators';
import {ErrorsTranslator} from '../models/errorsTranslator';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

const MAVPAS = 0;
const PAS = 1;
const CONNECTION = 0;
const LOGIC = 1;

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  constructor(private http: HttpClient) {}

  auLogicPassages$: Observable<AuPassage[]>;
  auConnectionPassages$: Observable<AuPassage[]>;
  connectionPassages$: Observable<Passage[]>;
  logicPassages$: Observable<Passage[]>;
  passagesDictionary: { [tableName: string]: [ Observable<any>,
                                               (passages: AuPassage[] | Passage[] | Passage | AuPassage) => Observable<boolean> ]; } = {};
  baseUrl = environment.baseUrl;

  public initPassages() {
    this.auConnectionPassages$ = this.getConnectionAuPassages();
    this.auLogicPassages$ = this.getLogicAuPassages();
    this.connectionPassages$ = this.getConnectionPassages();
    this.logicPassages$ = this.getLogicPassages();
    this.setDictionary();
  }

  private setDictionary() {
    this.passagesDictionary[databases[MAVPAS].tables[CONNECTION].name] =
      [this.connectionPassages$.pipe(map(value => this.translateErrors(value))), this.insertToPassageCopyFromConnection.bind(this)];

    this.passagesDictionary[databases[MAVPAS].tables[LOGIC].name] =
      [this.logicPassages$.pipe(map(value => this.translateErrors(value))), this.insertToPassageCopyFromLogic.bind(this)];

    this.passagesDictionary[databases[PAS].tables[CONNECTION].name] =
      [this.auConnectionPassages$.pipe(map(value => this.translateErrors(value))), this.insertToAuPassageCopyFromConnection.bind(this)];

    this.passagesDictionary[databases[PAS].tables[LOGIC].name] =
      [this.auLogicPassages$.pipe(map(value => this.translateErrors(value))), this.insertToAuPassageCopyFromLogic.bind(this)];
  }

  private translateErrors(passages: AuPassage[] | Passage[]) {
    const translator = errorsTranslator as ErrorsTranslator;
    passages.forEach(passage => passage.translate = translator[passage.error_msg]);
    return passages;
  }

  public insertToPassageCopyFromConnection(passages: Passage[]) {
    return this.http.post<boolean>(this.baseUrl + '/fixConnectionPassages', passages);
  }

  public insertToPassageCopyFromLogic(passage: Passage) {
    return this.http.post<boolean>(this.baseUrl + '/fixLogicPassage', passage);
  }

  public insertToAuPassageCopyFromConnection(passages: AuPassage[]) {
    return this.http.post<boolean>(this.baseUrl + '/fixAuConnectionPassages', passages);
  }

  public insertToAuPassageCopyFromLogic(passage: AuPassage) {
    return this.http.post<boolean>(this.baseUrl + '/fixAuLogicPassage', passage);
  }

  public getConnectionAuPassages(): Observable<AuPassage[]> {
    return this.http.get<AuPassage[]>(this.baseUrl + '/auConnectionPassages');
  }

  public getLogicAuPassages(): Observable<AuPassage[]> {
    return this.http.get<AuPassage[]>(this.baseUrl + '/auLogicPassages');
  }

  public getConnectionPassages(): Observable<Passage[]> {
    return this.http.get<Passage[]>(this.baseUrl + '/connectionPassages');
  }

  public getLogicPassages(): Observable<Passage[]> {
    return this.http.get<Passage[]>(this.baseUrl + '/logicPassages');
  }
}
