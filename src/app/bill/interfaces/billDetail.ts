import { BillAction } from '../interfaces/billAction';
import { BillAmendment } from './billAmendment';

export interface BillDetail {
  actions: BillAction[];
  amendments: BillAmendment[];
  committees: string[];
  congress: string;
  introduced: string;
  lastMajorActionDate: string;
  summary: string;
  textURL: string;
  billTitle: string;
  following: boolean;
}
