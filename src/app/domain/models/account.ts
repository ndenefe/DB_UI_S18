import { Phone } from './phone';
import { Login } from './login';

export class Account {
  name?: string;
  email?: string;
  isEmployee?: boolean;
  departmentId?: number;
  phoneNumbers?: Phone[];
  login?: Login[];
}
