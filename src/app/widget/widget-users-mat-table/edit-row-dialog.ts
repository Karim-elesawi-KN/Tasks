import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'edit-row-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, CommonModule, FormsModule],
  template: `<h2 mat-dialog-title>Edit Row</h2>

    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="editedRow.ID" placeholder="ID" />
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="editedRow.Name" placeholder="Name" />
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="editedRow.Country" placeholder="Country" />
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="editedRow.Age" placeholder="Age" />
      </mat-form-field>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </div> `,
})
export class EditRowDialog {
  editedRow: any;

  constructor(
    public dialogRef: MatDialogRef<EditRowDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editedRow = { ...data };
  }

  onSave(): void {
    this.dialogRef.close(this.editedRow);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
