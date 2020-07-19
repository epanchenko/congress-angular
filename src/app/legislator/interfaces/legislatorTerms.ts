interface Term {
  start: string;
  end: string;
  position: string;
}

export interface LegislatorTerms {
  data: {
    terms: Term[];
    name: string;
  };
}
