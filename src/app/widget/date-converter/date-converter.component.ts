import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HijriDatepickerComponent } from './hijri-datepicker/hijri-datepicker.component';
import { GregoianDatepickerComponent } from './gregoian-datepicker/gregoian-datepicker.component';
import momentGregorian, { Moment } from 'moment';
import momentHijri from 'moment-hijri';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'widget-date-converter',
  standalone: true,
  imports: [HijriDatepickerComponent, GregoianDatepickerComponent],
  templateUrl: './date-converter.component.html',
  styleUrl: './date-converter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateConverterComponent {
  gregorianDate = new FormControl(momentGregorian());
  hijriDate = new FormControl(momentHijri());

  onHijriDateChange(newHijriDate: Moment): void {
    const hijriMoment = momentGregorian(newHijriDate);
    this.gregorianDate.setValue(hijriMoment);
    console.log('Converted Hijri to Gregorian:', this.gregorianDate);
  }

  onGregorianDateChange(newGregorianDate: Moment): void {
    const gregorianMoment = momentHijri(newGregorianDate);
    this.hijriDate.setValue(gregorianMoment);
    console.log('Converted Gregorian to Hijri:', this.hijriDate);
  }

  clear() {
    this.gregorianDate.reset();
    this.hijriDate.reset();
    console.log('Dates cleared');
  }

  isArabic = false;
  toggleLanguage(): void {
    this.isArabic = !this.isArabic;
  }
}
