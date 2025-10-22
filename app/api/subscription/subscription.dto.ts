import { type BaseSchema } from "../../common/dto/base.dto";

export interface ISubscription extends BaseSchema {
  title: string;
  description: string;
  amount: number;
  day: number;
  api_call: number;
}
