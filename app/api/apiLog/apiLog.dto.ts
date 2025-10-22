import { type BaseSchema } from "../../common/dto/base.dto";

export interface IApiLog extends BaseSchema {
  userId: number;
  key: string;
  date: string;
  time: string;
}
