import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomHijriDateAdapter } from '../../date-picker/date-picker-hijri.component';
import { default as _rollupMoment } from 'moment';
import moment from 'moment-hijri';

export let locale = 'ar';

export const CUSTOM_HIJRI_DATE_FORMATS = {
  parse: {
    dateInput: 'iYYYY/iMM/iDD',
  },
  display: {
    dateInput: 'iYYYY/iM/iD',
    monthYearLabel: 'iMMMM iYYYY',
    dateA11yLabel: 'iYYYY/iMM/iDD',
    monthYearA11yLabel: 'iMMMM iYYYY',
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
    { provide: MAT_DATE_LOCALE, useValue: locale },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_HIJRI_DATE_FORMATS },
  ],
  templateUrl: './hijri-datepicker.component.html',
  styleUrl: './hijri-datepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HijriDatepickerComponent implements OnInit {
  @Output() hijriDateChange = new EventEmitter<string>();
  @Input() selectedDate: string | undefined;
  private readonly _adapter = inject<DateAdapter<moment.Moment>>(
    DateAdapter
  ) as CustomHijriDateAdapter;
  languageClass = 'arabic';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const todayHijri = moment().format('iYYYY/iM/iD');
    moment.locale(locale);
  }

  toggleLanguage() {
    this._adapter.toggleLanguage();
    if (this.languageClass === 'arabic') {
      this.languageClass = 'english';
      this._adapter.setLocale('en');
      moment.locale('en');
    } else {
      this.languageClass = 'arabic';
      this._adapter.setLocale('ar-SA');
      moment.locale('ar-SA');
    }
    this.cdr.detectChanges();
  }

  onDateChange(event: any): void {
    const hijriDate = moment(event.value).format('YYYY/MM/DD');
    this.hijriDateChange.emit(hijriDate);
  }
}
