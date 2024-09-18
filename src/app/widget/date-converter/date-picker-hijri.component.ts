import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import moment, { Moment } from 'moment-hijri';

@Injectable({ providedIn: 'root' })
export class CustomHijriDateAdapter extends DateAdapter<moment.Moment> {
  private readonly hijriMonths = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الآخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ];
  private readonly weekdays = ['س', 'ج', 'خ', 'ر', 'ث', 'ن', 'ح'];

  private readonly hijriMonthsEN = [
    'Muharram',
    'Safar',
    'Rabi al-Awwal',
    'Rabi al-Thani',
    'Jumada al-Awwal',
    'Jumada al-Thani',
    'Rajab',
    'Sha’ban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qi’dah',
    'Dhu al-Hijjah',
  ];
  private readonly weekdaysEN = [
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ];

  private isArabic = true;

  override getYear(date: Moment): number {
    return date.iYear();
  }
  override getMonth(date: Moment): number {
    return date.iMonth();
  }
  override getDate(date: Moment): number {
    return date.iDate();
  }
  override getDayOfWeek(date: Moment): number {
    return date.day();
  }
  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return this.isArabic ? this.hijriMonths : this.hijriMonthsEN;
  }
  override getDateNames(): string[] {
    return Array.from({ length: 30 }, (_, i) => String(i + 1));
  }
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return this.isArabic ? this.weekdays : this.weekdaysEN;
  }
  override getYearName(date: Moment): string {
    return `${date.iYear()}`;
  }
  override getFirstDayOfWeek(): number {
    return 0;
  }
  override getNumDaysInMonth(date: Moment): number {
    return date.iDaysInMonth();
  }
  override clone(date: Moment): Moment {
    return moment(date);
  }
  override createDate(year: number, month: number, date: number): Moment {
    return moment().iYear(year).iMonth(month).iDate(date);
  }
  override today(): Moment {
    return moment();
  }
  override parse(value: any, parseFormat: any): Moment | null {
    if (value && typeof value === 'string') {
      return moment(value, parseFormat, true).isValid()
        ? moment(value, parseFormat)
        : null;
    }
    return null;
  }
  override format(date: Moment, displayFormat: any): string {
    return date.format(displayFormat);
  }
  override addCalendarYears(date: Moment, years: number): Moment {
    return date.add(years, 'iYear');
  }
  override addCalendarMonths(date: Moment, months: number): Moment {
    return date.add(months, 'iMonth');
  }
  override addCalendarDays(date: Moment, days: number): Moment {
    return date.add(days, 'days');
  }
  override toIso8601(date: Moment): string {
    return date.toISOString();
  }
  override isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }
  override isValid(date: Moment): boolean {
    return date.isValid();
  }
  override invalid(): Moment {
    return moment.invalid();
  }

  toggleLanguage() {
    this.isArabic = !this.isArabic;
  }
}
