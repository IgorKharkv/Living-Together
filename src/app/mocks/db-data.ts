import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import {Observable, of} from 'rxjs';

export const PASSAGES: Passage[] = [
    {
      ID: 1234,
      CITIZEN_ID: 123456789,
      START_DATE: new Date(),
      ERROR_MSG: 'no_data_found',
    },
  {
    ID: 4321,
    CITIZEN_ID: 100000099,
    START_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  },
  {
    ID: 2222,
    CITIZEN_ID: 100000090,
    START_DATE: new Date(),
    ERROR_MSG: 'no_data_found',
  },
  {
    ID: 4444,
    CITIZEN_ID: 100000090,
    START_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  },
  {
    ID: 555,
    CITIZEN_ID: 123458889,
    START_DATE: new Date(),
    ERROR_MSG: 'no_data_found',
  },
  {
    ID: 7777,
    CITIZEN_ID: 100000009,
    START_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    ID: 11111,
    CITIZEN_ID: 100000088,
    START_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    ID: 666666,
    CITIZEN_ID: 100000222,
    START_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    ID: 999999,
    CITIZEN_ID: 100000333,
    START_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    ID: 676767,
    CITIZEN_ID: 100000444,
    START_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    ID: 232323,
    CITIZEN_ID: 100000777,
    START_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  }
];

export const AU_PASSAGES: AuPassage[] = [
  {
    PI_ID_NUM: 123456789,
    PI_DATE: new Date(),
    ERROR_MSG: 'no_data_found',
  },
  {
    PI_ID_NUM: 100000099,
    PI_DATE: new Date(),
    ERROR_MSG: 'no_data_found',
  },
  {
    PI_ID_NUM: 100000090,
    PI_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  },
  {
    PI_ID_NUM: 100000090,
    PI_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  },
  {
    PI_ID_NUM: 123458889,
    PI_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    PI_ID_NUM: 100000009,
    PI_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    PI_ID_NUM: 100000666,
    PI_DATE: new Date(),
    ERROR_MSG: 'connection_error',
  },
  {
    PI_ID_NUM: 100000888,
    PI_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  },
  {
    PI_ID_NUM: 100000004,
    PI_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  },
  {
    PI_ID_NUM: 100000232,
    PI_DATE: new Date(),
    ERROR_MSG: 'unique_constraint',
  }
];

export function getPassages(): Observable<Passage[]> {
    return of(PASSAGES);
}

export function getAuPassages(): Observable<AuPassage[]> {
  return of(AU_PASSAGES);
}

