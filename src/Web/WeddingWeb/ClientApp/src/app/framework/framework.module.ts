import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base.component';
import { LoggingService } from './logging/logging.service';
import { ErrorHandlerService } from './errorhandling/error-handler.service';
import { CanLoadPhotoAndVideoGuard } from './guards/CanLoadPhotoAndVideoGuard';

@NgModule({
  declarations: [
    BaseComponent
  ],
  exports: [
    CommonModule
  ],
  providers: [
    LoggingService,
    CanLoadPhotoAndVideoGuard,
    { provide: ErrorHandler, useClass: ErrorHandlerService }]
})
export class FrameworkModule { }
