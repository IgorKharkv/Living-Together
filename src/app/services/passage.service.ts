import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import databases from '../../assets/data.json';
import errorsTranslator from "../../assets/error_messages_translate.json";
import {getAuPassages, getPassages , insertAllToAuPassageCopy, insertAllToPassageCopy} from '../mocks/db-data';
import {catchError, map} from 'rxjs/operators';
import {ErrorsTranslator} from '../models/errorsTranslator';

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  auLogicPassages$: Observable<AuPassage[]>;
  auConnectionPassages$: Observable<AuPassage[]>;
  connectionPassages$: Observable<Passage[]>;
  logicPassages$: Observable<Passage[]>;
  passagesDictionary: { [tableName: string]: Observable<any>; } = {};

  constructor() { }

  public init() {
    this.passages();
  }

  private passages() {
    this.auConnectionPassages$ = getAuPassages();
    this.auLogicPassages$ = getAuPassages();
    this.connectionPassages$ = getPassages();
    this.logicPassages$ = getPassages();
    this.setDictionary();
  }

  private setDictionary() {
    this.passagesDictionary[databases[0].tables[0].name] =
      this.connectionPassages$.pipe(map(value => this.translatePassageErrors(value)));
    this.passagesDictionary[databases[0].tables[1].name] =
      this.logicPassages$.pipe(map(value => this.translatePassageErrors(value)));
    this.passagesDictionary[databases[1].tables[0].name] =
      this.auConnectionPassages$.pipe(map(value => this.translateAuPassageErrors(value)));
    this.passagesDictionary[databases[1].tables[1].name] =
      this.auLogicPassages$.pipe(map(value => this.translateAuPassageErrors(value)));
  }

  private translateAuPassageErrors(passages: AuPassage[]) {
    const translator = errorsTranslator as ErrorsTranslator;
    return passages.map(passage => {
      passage.TRANSLATE = translator[passage.ERROR_MSG];
      return passage;
    });
  }

  private translatePassageErrors(passages: Passage[]) {
    const translator = errorsTranslator as ErrorsTranslator;
    return passages.map(passage => {
      passage.TRANSLATE = translator[passage.ERROR_MSG];
      return passage;
    });
  }

  public insertAllToPassageCopy(passages: Passage[]) {
    return insertAllToAuPassageCopy();
  }

  public insertAllToAuPassageCopy(passages: AuPassage[]) {
    return insertAllToPassageCopy();
  }
}
