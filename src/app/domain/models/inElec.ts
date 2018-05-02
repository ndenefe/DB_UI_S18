import { Politicians } from './politicians';
import { Time } from '@angular/common';

export class InElec {
  polis?: Politicians[];
  position?: string;
  dateTime?: Time;
  city?: string;
  state?: string;
}
