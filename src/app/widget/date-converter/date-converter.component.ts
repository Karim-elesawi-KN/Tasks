import { Component, OnInit } from '@angular/core';
import { HijriDatepickerComponent } from './hijri-datepicker/hijri-datepicker.component';
import { GregoianDatepickerComponent } from './gregoian-datepicker/gregoian-datepicker.component';
import moment from 'moment';
import 'moment-hijri';

@Component({
  selector: 'widget-date-converter',
  standalone: true,
  imports: [HijriDatepickerComponent, GregoianDatepickerComponent],
  templateUrl: './date-converter.component.html',
  styleUrl: './date-converter.component.css',
})
export class DateConverterComponent {
  gregorianDate: Date | undefined = new Date();
  hijriDate: string = moment().format('iYYYY/iMM/iDD');

  onHijriDateChange(newHijriDate: string): void {
    const hijri = moment(newHijriDate, 'iYYYY/iM/iD');
    this.gregorianDate = hijri.toDate();
  }

  onGregorianDateChange(newGregorianDate: Date): void {
    this.gregorianDate = newGregorianDate;
    const hijri = moment(newGregorianDate).format('iYYYY/iM/iD');
    this.hijriDate = hijri;
  }
}
