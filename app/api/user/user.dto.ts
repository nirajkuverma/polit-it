import { type BaseSchema } from "../../common/dto/base.dto";

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  phone: string;
  type: string;
  password?: string;
}
