import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
export class GregoianDatepickerComponent {
  @Input() selectedDate: Date | undefined;
  @Output() dateChange = new EventEmitter<Date>();

  onDateChange(event: any): void {
    const gregorianDate = event.value;
    this.dateChange.emit(gregorianDate);
  }
}
