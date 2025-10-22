import { type BaseSchema } from "../../common/dto/base.dto";

export interface ITask extends BaseSchema {
  role: string;
  content: string;
}
