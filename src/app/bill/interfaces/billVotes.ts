interface BillVote {
  billTitle: string;
  chamber: string;
  question: string;
  result: string;
  rollID: string;
  votedAt: string;
}

export interface BillVotes {
  votes: BillVote[];

  lastEvaluatedKey: {
    rollID: string;
    votedAt: string;
  };

  moreVotesAvailable: boolean;
}
