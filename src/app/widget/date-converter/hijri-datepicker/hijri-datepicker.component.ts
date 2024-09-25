import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import moment, { Moment } from 'moment';
import 'moment/locale/ar-SA';
import 'moment/locale/en-gb';

import { CustomHijriDateAdapter } from '../hijri-date-adapter';
import momentHijri from 'moment-hijri';

export const CUSTOM_HIJRI_DATE_FORMATS = {
  parse: {
    dateInput: 'iD/iM/iYYYY',
  },
  display: {
    dateInput: 'iMMM iD iYYYY',
    monthYearLabel: 'iMMM iYYYY',
    dateA11yLabel: 'iD/iM/iYYYY',
    monthYearA11yLabel: 'iMMM iYYYY',
  },
};

@Component({
  selector: 'app-hijri-datepicker',
  standalone: true,
  imports: [
    MatFormField,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomHijriDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_HIJRI_DATE_FORMATS },
  ],
  templateUrl: './hijri-datepicker.component.html',
  styleUrl: './hijri-datepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HijriDatepickerComponent implements OnInit {
  @Input() selectedDate = new FormControl(momentHijri(new Date()));
  @Output() hijriDateChange = new EventEmitter<Moment>();
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);

  constructor(private dateAdapter: DateAdapter<any>) {}

  ngOnInit() {
    const hijriMoment = momentHijri(this.selectedDate.value);
    console.log('first:', hijriMoment);
    const hijriDateObject = {
      year: hijriMoment.iYear(),
      month: hijriMoment.iMonth() + 1,
      day: hijriMoment.iDate(),
    };
    console.log('second', hijriDateObject);
    console.log(
      'now hijri alt:',
      this.selectedDate.value!.format('ddd iMMM iD iYYYY HH:mm:ss Z')
    );
    const x = momentHijri(
      `${hijriDateObject.year}-${hijriDateObject.month}-${hijriDateObject.day}`,
      'iYYYY-iM-iD'
    );
    console.log('third', x);
    this.selectedDate.setValue(x);
  }

  onDateChange(event: any): void {
    const hijriDate = event.value;
    this.hijriDateChange.emit(hijriDate);
  }

  @Input() isArabic!: boolean;
  ngOnChanges(): void {
    const customAdapter = this.dateAdapter as CustomHijriDateAdapter;
    customAdapter.toggleLanguage();
    this._adapter.setLocale(this.isArabic ? 'ar-SA' : 'en-EG');
  }
}
