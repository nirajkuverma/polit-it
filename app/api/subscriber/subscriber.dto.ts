import { type BaseSchema } from "../../common/dto/base.dto";

export interface ISubscriber extends BaseSchema {
  userId: number;
  subId: number;
  isExpired: string;
}
