import { Component } from '@angular/core';
import { AppInjector } from 'src/app/app-injector.service';
import { LoggingService } from '../logging/logging.service';

@Component({
  template: ``,
})
export class BaseComponent {

  private loggingService: LoggingService;

  constructor() {
    const injector = AppInjector.getInstance().getInjector();

    this.loggingService = injector.get(LoggingService);
    this.logNavigation();
  }

  private logNavigation() {
    this.loggingService.logPageView();
  }
}
