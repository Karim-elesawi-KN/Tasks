import { Component, Input, ViewContainerRef, OnInit } from '@angular/core';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-widget',
  template: '',
  standalone: true,
})
export class WidgetComponent implements OnInit {
  @Input() widgetContext!: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private WidgetService: WidgetService
  ) {}

  ngOnInit() {
    const component = this.WidgetService.getComponent(this.widgetContext);
    if (component) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(component);
    }
  }
}