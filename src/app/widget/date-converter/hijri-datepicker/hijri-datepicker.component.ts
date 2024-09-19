import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomHijriDateAdapter } from '../hijri-date-adapter';
import { default as _rollupMoment, locale } from 'moment';
import momentHijri from 'moment-hijri';
import momentGregorian from 'moment';

export const CUSTOM_HIJRI_DATE_FORMATS = {
  parse: {
    dateInput: 'iM/iD/iYYYY',
  },
  display: {
    dateInput: 'iM/iD/iYYYY',
    monthYearLabel: 'iYYYY iMMMM',
    dateA11yLabel: 'iM/iD/iYYYY',
    monthYearA11yLabel: 'iYYYY iMMMM',
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
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomHijriDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_HIJRI_DATE_FORMATS },
  ],
  templateUrl: './hijri-datepicker.component.html',
  styleUrl: './hijri-datepicker.component.css',
})
export class HijriDatepickerComponent implements OnInit {
  @Input() selectedDate: Date | undefined;
  @Output() hijriDateChange = new EventEmitter<Date>();

  constructor(private dateAdapter: DateAdapter<any>) {}

  ngOnInit() {
    let hijri = momentHijri(this.selectedDate).format('iYYYY/iM/iD');
    const momentDate = momentGregorian(hijri, 'iYYYY-iMM-iDD');
    this.selectedDate = momentDate.toDate();
    console.log(this.selectedDate);
  }

  onDateChange(event: any): void {
    const hijriDate = event.value;
    this.hijriDateChange.emit(hijriDate);
  }

  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);
  @Input() isArabic: boolean = false;
  ngOnChanges(): void {
    const customAdapter = this.dateAdapter as CustomHijriDateAdapter;
    customAdapter.toggleLanguage();
    if (this.isArabic) {
      this._locale.set('ar-SA');
      this._adapter.setLocale(this._locale);
    } else {
      this._locale.set('en-EG');
      this._adapter.setLocale(this._locale);
    }
  }
}
