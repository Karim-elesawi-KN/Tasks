import { Component, OnInit } from '@angular/core';
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
  hijriDate: string = '';

  onHijriDateChange(newHijriDate: string): void {
    const hijri = momentGregorian(newHijriDate, 'iYYYY/iM/iD');
    this.gregorianDate = hijri.toDate();
  }

  onGregorianDateChange(newGregorianDate: Date): void {
    const hijri = momentHijri(newGregorianDate).format('iYYYY/iM/iD');
    this.hijriDate = hijri;

    console.log('Converted Hijri Date:', this.hijriDate);
  }

  languageClass = 'arabic';
  toggleLanguage() {
    if (this.languageClass === 'arabic') {
      this.languageClass = 'english';
      momentHijri.locale('en');
    } else {
      this.languageClass = 'arabic';
      momentHijri.locale('ar-SA');
    }
  }
}
