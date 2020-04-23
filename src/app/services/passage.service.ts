import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import databases from '../../assets/databases.json';
import errorsTranslator from '../../assets/error_messages_translate.json';
import {getAuPassages, getPassages , insertAllToAuPassageCopy, insertAllToPassageCopy} from '../mocks/db-data';
import {map} from 'rxjs/operators';
import {ErrorsTranslator} from '../models/errorsTranslator';

const MAVPAS = 0;
const PAS = 1;
const CONNECTION = 0;
const LOGIC = 1;

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  auLogicPassages$: Observable<AuPassage[]>;
  auConnectionPassages$: Observable<AuPassage[]>;
  connectionPassages$: Observable<Passage[]>;
  logicPassages$: Observable<Passage[]>;
  passagesDictionary: { [tableName: string]: Observable<any>; } = {};

  public initPassages() {
    this.auConnectionPassages$ = getAuPassages();
    this.auLogicPassages$ = getAuPassages();
    this.connectionPassages$ = getPassages();
    this.logicPassages$ = getPassages();
    this.setDictionary();
  }

  private setDictionary() {
    this.passagesDictionary[databases[MAVPAS].tables[CONNECTION].name] =
      this.connectionPassages$.pipe(map(value => this.translateErrors(value)));
    this.passagesDictionary[databases[MAVPAS].tables[LOGIC].name] =
      this.logicPassages$.pipe(map(value => this.translateErrors(value)));
    this.passagesDictionary[databases[PAS].tables[CONNECTION].name] =
      this.auConnectionPassages$.pipe(map(value => this.translateErrors(value)));
    this.passagesDictionary[databases[PAS].tables[LOGIC].name] =
      this.auLogicPassages$.pipe(map(value => this.translateErrors(value)));
  }

  private translateErrors(passages: AuPassage[] | Passage[]) {
    const translator = errorsTranslator as ErrorsTranslator;
    passages.forEach(passage => passage.TRANSLATE = translator[passage.ERROR_MSG]);
    return passages;
  }

  public insertAllToPassageCopy(passages: Passage[]) {
    // TODO: http post to copy
    return insertAllToAuPassageCopy();
  }

  public insertAllToAuPassageCopy(passages: AuPassage[]) {
    // TODO: http post to copy
    return insertAllToPassageCopy();
  }
}
