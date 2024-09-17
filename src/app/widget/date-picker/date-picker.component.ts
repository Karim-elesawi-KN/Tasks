import { CommonModule } from '@angular/common';
import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { GregorianDateAdapter } from './date-picker-gregorian.component';
import { CustomHijriDateAdapter } from './date-picker-hijri.component';
import {
  gregorianDateAdapterFactory,
  hijriDateAdapterFactory,
} from './date-adapter';
import { CUSTOM_HIJRI_DATE_FORMATS } from '../date-converter/hijri-datepicker/hijri-datepicker.component';

@Component({
  selector: 'widget-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: GregorianDateAdapter, multi: true },
    { provide: DateAdapter, useClass: CustomHijriDateAdapter, multi: false },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_HIJRI_DATE_FORMATS },
  ],
})
export class DatePickerComponent {
  gregorianDate: Date | null = new Date();
  hijriDate: Date | null = new Date();

  convertDate(date: Date, toFormat: 'gregorian' | 'hijri'): void {
    console.log('Date selected:', date);
    if (toFormat === 'gregorian') {
      this.gregorianDate = this.convertHijriToGregorian(date);
    } else {
      this.hijriDate = this.convertGregorianToHijri(date);
    }
  }

  private convertGregorianToHijri(date: Date): Date {
    return date;
  }

  private convertHijriToGregorian(date: Date): Date {
    return date;
  }
}
