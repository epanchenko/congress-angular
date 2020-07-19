interface Vote {
  chamber: string;
  rollID: string;
  billTitle: string;
  question: string;
  result: string;
  vote: string;
}

export interface VoteSummaryLastKey {
  data: {
    votes: Vote[];
    name: string;
    lastEvaluatedKey: {
      rollID: string;
      votedAt: string;
    };
    moreVotesAvailable: boolean;
  };
}
