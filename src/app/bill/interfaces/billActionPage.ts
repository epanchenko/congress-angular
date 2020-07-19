import { BillAction } from './billAction';

export interface BillActionPage {
  actions: BillAction[];
  billID: string;
  billTitle: string;
}
