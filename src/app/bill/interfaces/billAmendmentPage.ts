import { BillAmendment } from './billAmendment';

export interface BillAmendmentPage {
  amendments: BillAmendment[];
  billID: string;
  billTitle: string;
}
