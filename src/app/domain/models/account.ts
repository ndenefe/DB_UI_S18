import { Phone } from "./phone";

export class Account {
  name?: string;
  email?: string;
  isEmployee?: boolean;
  departmentId?: number;
  phoneNumbers?: Phone[]
}
