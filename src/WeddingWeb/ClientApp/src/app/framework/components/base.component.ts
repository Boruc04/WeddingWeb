import { Component, ReflectiveInjector } from '@angular/core';
import { LoggingService } from '../logging/logging.service';

@Component({
  template: ``,
})
export class BaseComponent {

  private loggingService: LoggingService;

  constructor() {
    // Manually retrieve the monitoring service from the injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = ReflectiveInjector.resolveAndCreate([
      LoggingService
    ]);

    this.loggingService = injector.get(LoggingService);
    this.logNavigation();
  }

  private logNavigation() {
    this.loggingService.logPageView();
  }
}
