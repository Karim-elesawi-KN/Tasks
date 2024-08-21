import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/pages.service';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from "./page-title/page-title.component";
import { PageContentComponent } from "./page-content/page-content.component";
import { GridsterComponent } from '../gridster/gridster.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, PageTitleComponent, PageContentComponent, GridsterComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page: any;
  private destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, private pageService: PageService) {}

  ngOnInit() {
    const subscription = this.route.paramMap.subscribe(params => {
      this.page = null;
      const context = params.get('pageContext'); 
      if (context) {
        this.page = this.pageService.getPageById(context);
        if (this.page) {
          this.page.widgets = this.page.widgets || [];
          this.page.widgets.map((widget: { x: any; y: any; cols: any; rows: any; widgetContext: any; }, index: any) => {
            return {
              x: widget.x,
              y: widget.y,
              cols: widget.cols,
              rows: widget.rows,
              widgetContext: widget.widgetContext
            };
          });
          console.log("Page loaded:", this.page);
        } else {
          console.error("Page not found for context:", context);
        }
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
