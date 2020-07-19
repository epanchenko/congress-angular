import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';

export interface CommitteeMemberDetail {
  name: string;
  currentMembers: LegislatorSummary[];
}
