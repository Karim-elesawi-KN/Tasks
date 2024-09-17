import { GregorianDateAdapter } from './date-picker-gregorian.component';
import { CustomHijriDateAdapter } from './date-picker-hijri.component';

export function gregorianDateAdapterFactory(): GregorianDateAdapter {
  return new GregorianDateAdapter();
}

export function hijriDateAdapterFactory(): CustomHijriDateAdapter {
  return new CustomHijriDateAdapter();
}
