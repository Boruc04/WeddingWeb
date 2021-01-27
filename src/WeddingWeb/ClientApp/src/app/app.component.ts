import { Component, ViewEncapsulation } from '@angular/core';
import { LoggingService } from './framework/logging/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'wedding-web-app';

  constructor() { }
}
