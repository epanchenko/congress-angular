import { NominationAction } from './nominationAction';

export interface NominationActionPage {
  description: string;
  nominationID: string;
  actions: NominationAction[];
}
