import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridsterModule,} from 'angular-gridster2';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../widget/widget.component';
import saveAs from 'file-saver';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-gridster',
  standalone: true,
  imports: [CommonModule, GridsterModule, WidgetComponent],
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.css'],
})
export class GridsterComponent implements OnInit {
  @Input() widgets: any[] = [];
  options: GridsterConfig = {};
  dashboard: GridsterItem[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.options = {
      draggable: {
        enabled: false,
      },
      resizable: {
        enabled: false,
      },
      gridType: 'fit',
      displayGrid: 'onDrag&Resize',
      margin: 10,
      outerMargin: true,
      pushItems: true,
      minCols: 6,
      minRows: 6,
      maxCols: 12,
      maxRows: 12,
    };

    const subscription = this.pageService.editMode$.subscribe(
      (isEditMode) => {
        this.options.draggable!.enabled = isEditMode;
        this.options.resizable!.enabled = isEditMode;
        if (this.options.api && this.options.api.optionsChanged) {
          this.options.api.optionsChanged();
        }
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
