import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditModeService {
  private editModeSubject = new BehaviorSubject<boolean>(false);
  editMode$ = this.editModeSubject.asObservable();

  toggleEditMode() {
    this.editModeSubject.next(!this.editModeSubject.value);
  }

  get isEditMode() {
    return this.editModeSubject.value;
  }
}
