import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
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

}
