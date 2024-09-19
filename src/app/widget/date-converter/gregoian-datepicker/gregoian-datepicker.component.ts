import { CommonModule } from '@angular/common';
import {
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
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-gregoian-datepicker',
  standalone: true,
  imports: [
    MatFormField,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './gregoian-datepicker.component.html',
  styleUrl: './gregoian-datepicker.component.css',
})
export class GregoianDatepickerComponent implements OnInit {
  @Input() selectedDate: Date | undefined;
  @Output() dateChange = new EventEmitter<Date>();
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);

  ngOnInit(): void {}

  onDateChange(event: any): void {
    const gregorianDate = event.value;
    this.dateChange.emit(gregorianDate);
  }

  @Input() isArabic: boolean = false;
  ngOnChanges(): void {
    if (this.isArabic) {
      this._adapter.setLocale('ar-EG');
    } else {
      this._adapter.setLocale('en-EG');
    }
  }
}
