import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base.component';
import { LoggingService } from './logging/logging.service';
import { ErrorHandlerService } from './errorhandling/error-handler.service';

@NgModule({
  declarations: [
    BaseComponent
  ],
  exports: [
    CommonModule
  ],
  providers: [
    LoggingService,
    { provide: ErrorHandler, useClass: ErrorHandlerService }]
})
export class FrameworkModule { }
