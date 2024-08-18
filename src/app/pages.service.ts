import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private pages: any[] = [];
  private landingPage: string = '';

  async loadPages(): Promise<void> {
    try {
      const response = await fetch('/assets/pages.json');
      const data = await response.json();
      this.pages = data.pages;
      this.landingPage = data.landingPage;
    } catch (error) {
      console.error('Error loading pages:', error);
    }
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
