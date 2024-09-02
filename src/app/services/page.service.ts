import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  //__________________________________________________________________________
  // Pages
  private pages: any[] = [];
  private landingPage: string = '';
  private pagesLoaded = false; 

  async loadPages(): Promise<void> {
    if (this.pagesLoaded) return; 

    const response = await fetch('/assets/pages.json');
    const data = await response.json();
    this.pages = data.pages;
    this.landingPage = data.landingPage;
    this.pagesLoaded = true; 
  }

  getPageById(id: string) {
    return this.pages.find(page => page.pageContext === id);
  }

  getPages() {
    return this.pages;
  }

  getLandingPage() {
    return this.landingPage;
  }
  //__________________________________________________________________________
  // Edit Mode - Setting Mode
  private editModeSubject = new BehaviorSubject<boolean>(false);
  private settingModeSubject = new BehaviorSubject<boolean>(false);
  editMode$ = this.editModeSubject.asObservable();
  toggleEditMode() {
    this.editModeSubject.next(!this.editModeSubject.value);
  }
  get isEditMode() {
    return this.editModeSubject.value;
  }

  toggleSettingMode() {
    this.settingModeSubject.next(!this.settingModeSubject.value);
  }
  get isSettingMode() {
    return this.settingModeSubject.value;
  }
  //__________________________________________________________________________
  //
}
