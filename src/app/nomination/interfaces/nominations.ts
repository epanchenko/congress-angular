import { Nomination } from './nomination';

export interface Nominations {
  nominations: Nomination[];
  lastEvaluatedKey: {
    nominationID: string;
    latestActionDate: string;
  };
  moreNominationsAvailable: boolean;
}
