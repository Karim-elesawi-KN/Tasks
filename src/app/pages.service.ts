import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private pages: any[] = [];
  private landingPage: string = '';
  private pagesLoaded = false; // Track if pages have been loaded

  async loadPages(): Promise<void> {
    if (this.pagesLoaded) return; // Prevent reloading if already loaded

    const response = await fetch('/assets/pages.json');
    const data = await response.json();
    this.pages = data.pages;
    this.landingPage = data.landingPage;
    this.pagesLoaded = true; // Mark as loaded
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

