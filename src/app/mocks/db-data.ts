import {Au_Passage} from '../models/au_passage';
import {Passage} from '../models/passage';

export const PASSAGES: Passage[] = [
    {
      ID: 1234,
      CITIZEN_ID: 123456789,
      START_DATE: new Date(),
      ERROR_MSG: 'no data found',
    },
  {
    ID: 4321,
    CITIZEN_ID: 100000099,
    START_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    ID: 2222,
    CITIZEN_ID: 100000090,
    START_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    ID: 4444,
    CITIZEN_ID: 100000090,
    START_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    ID: 555,
    CITIZEN_ID: 123458889,
    START_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    ID: 7777,
    CITIZEN_ID: 100000009,
    START_DATE: new Date(),
    ERROR_MSG: 'no data found',
  }
];

export const AU_PASSAGES: Au_Passage[] = [
  {
    PI_ID_NUM: 123456789,
    PI_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    PI_ID_NUM: 100000099,
    PI_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    PI_ID_NUM: 100000090,
    PI_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    PI_ID_NUM: 100000090,
    PI_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    PI_ID_NUM: 123458889,
    PI_DATE: new Date(),
    ERROR_MSG: 'no data found',
  },
  {
    PI_ID_NUM: 100000009,
    PI_DATE: new Date(),
    ERROR_MSG: 'no data found',
  }
];

export function getPassages() {
    return PASSAGES;
}

export function getAuPassages() {
  return AU_PASSAGES;
}

