import { NominationAction } from './nominationAction';

export interface Nomination {
  nominationID: string;
  description: string;
  dateReceived: string;
  following: boolean;
  latestActionDate: string;
  committeeID: string;
  congress: string;
  status: string;
  actions: NominationAction[];
}
