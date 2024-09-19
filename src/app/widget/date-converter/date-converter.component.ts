import { Component } from '@angular/core';
import { HijriDatepickerComponent } from './hijri-datepicker/hijri-datepicker.component';
import { GregoianDatepickerComponent } from './gregoian-datepicker/gregoian-datepicker.component';
import momentGregorian from 'moment';
import momentHijri from 'moment-hijri';

@Component({
  selector: 'widget-date-converter',
  standalone: true,
  imports: [HijriDatepickerComponent, GregoianDatepickerComponent],
  templateUrl: './date-converter.component.html',
  styleUrl: './date-converter.component.css',
})
export class DateConverterComponent {
  gregorianDate: Date | undefined = new Date();
  hijriDate: Date | undefined = new Date();

  onHijriDateChange(newHijriDate: Date): void {
    const hijri = momentGregorian(newHijriDate, 'iM/iD/iYYYY');
    this.gregorianDate = hijri.toDate();
    console.log('Converted Gregorian Date:', this.gregorianDate);
  }

  onGregorianDateChange(newGregorianDate: Date): void {
    let hijri = momentHijri(newGregorianDate).format('iM/iD/iYYYY');
    const momentDate = momentGregorian(hijri, 'MM-DD-YYYY');
    this.hijriDate = momentDate.toDate();
    console.log('Converted Hijri Date:', this.hijriDate);
  }

  clear() {
    this.gregorianDate = undefined;
    this.hijriDate = undefined;
  }

  isArabic = false;
  toggleLanguage(): void {
    this.isArabic = !this.isArabic;
  }
}
