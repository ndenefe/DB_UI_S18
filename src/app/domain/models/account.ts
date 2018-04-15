import { Phone } from './phone';
import { Login } from './login';

export class Account {
  name?: string;
  email?: string;
  isEmployee?: boolean;
  departmentId?: number;
  phoneNumbers?: Phone[];
  login?: Login[];
  hasWebsite?: boolean;
  website?: string;
  tenure?: string;
}

export class Account2 {
  userId?: number;
  polId?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: Blob;
  phone?: string;
  favorites?: number; // Will be changing because favorite politicians need to be their own table
  partyId?: number;
  website?: string;
  platformId?: number;
}
