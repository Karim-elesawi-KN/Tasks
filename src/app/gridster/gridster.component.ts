import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridsterModule,
} from 'angular-gridster2';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-gridster',
  standalone: true,
  imports: [CommonModule, GridsterModule, WidgetComponent],
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GridsterComponent implements OnInit {
  @Input() widgets: any[] = [];
  page: any;
  options: GridsterConfig = {};
  dashboard: GridsterItem[] = [];

  ngOnInit() {
    console.log(this.widgets);
    this.options = {
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      gridType: 'fit',
      displayGrid: 'always',
      margin: 10,
      outerMargin: true,
      pushItems: true,
      minCols: 6,
      minRows: 6,
      maxCols: 12,
      maxRows: 12,
    };

    // this.dashboard = this.widgets.map((widget, index) => {
    //   return {
    //     x: widget.x,
    //     y: widget.y,
    //     cols: widget.cols,
    //     rows: widget.rows,
    //     widgetContext: widget.widgetContext,
    //   };
    // });
  }
}
