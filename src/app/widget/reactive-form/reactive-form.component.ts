import { Component } from '@angular/core';
import { DateConverterComponent } from '../date-converter/date-converter.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { HijriDatepickerComponent } from "../date-converter/hijri-datepicker/hijri-datepicker.component";

@Component({
  selector: 'widget-reactive-form',
  standalone: true,
  imports: [
    DateConverterComponent,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    HijriDatepickerComponent
],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthday: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form Submitted!', this.formGroup.value);
    }
  }
}
