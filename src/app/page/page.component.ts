import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../pages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page: any;
  private destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, private pageService: PageService) {}

  ngOnInit() {
    const subscription = this.route.paramMap.subscribe(params => {
      const context = params.get('pageContext'); 
      if (context) {
        this.page = this.pageService.getPageById(context);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
