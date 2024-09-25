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
import { DateAdapter } from '@angular/material/core';
import moment, { Moment } from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/ar-SA';
import 'moment/locale/en-gb';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'MMM D YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-gregoian-datepicker',
  standalone: true,
  imports: [
    MatFormField,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './gregoian-datepicker.component.html',
  styleUrl: './gregoian-datepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class GregoianDatepickerComponent implements OnInit {
  @Input() selectedDate = new FormControl(moment(new Date()));
  @Output() dateChange = new EventEmitter<Moment>();
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);

  ngOnInit(): void {
    console.log('now gregorian', this.selectedDate);
  }

  onDateChange(event: any): void {
    const gregorianDate = event.value;
    this.dateChange.emit(gregorianDate);
  }

  @Input() isArabic!: boolean;
  ngOnChanges(): void {
    this._adapter.setLocale(this.isArabic ? 'ar-SA' : 'en-EG');
  }
}
