import { Component, Input } from '@angular/core';
import { WidgetComponent } from '../../widget/widget.component';
import { GridsterComponent } from '../../gridster/gridster.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [WidgetComponent, GridsterComponent, CommonModule],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.css',
})
export class PageContentComponent {
  // @Input() content!: string;
  @Input() widgets!: any;
}
