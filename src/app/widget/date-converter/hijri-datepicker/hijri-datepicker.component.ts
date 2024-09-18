import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
  @Input() languageClass: string | undefined;

  ngOnInit() {
    const todayHijri = moment().format('iYYYY/iM/iD');
    moment.locale(this.languageClass === 'arabic' ? 'ar' : 'en');
  }

  onDateChange(event: any): void {
    const hijriDate = moment(event.value).format('YYYY/MM/DD');
    this.hijriDateChange.emit(hijriDate);
  }
}
