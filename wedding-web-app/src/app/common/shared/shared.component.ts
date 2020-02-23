import { Component, ReflectiveInjector } from '@angular/core';
import { MyMonitoringService } from '../../services/monitoring.service';

@Component({
  template: ``,
})
export class SharedComponent {

  private myMonitoringService: MyMonitoringService;

  constructor() {
    // Manually retrieve the monitoring service from the injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = ReflectiveInjector.resolveAndCreate([
      MyMonitoringService
    ]);

    this.myMonitoringService = injector.get(MyMonitoringService);
    this.logNavigation();
  }

  private logNavigation() {
    this.myMonitoringService.logPageView();
  }
}
