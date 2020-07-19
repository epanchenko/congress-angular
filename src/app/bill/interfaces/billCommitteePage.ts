interface Committee {
  committeeID: string;
  committeeName: string;
}

export interface BillCommitteePage {
  committees: Committee[];
  billTitle: string;
  billID: string;
}
