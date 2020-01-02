import { Component, NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [`
    .footer-header {
      padding: 12px;
      font-size: 12px;
    }
  `]
})
export class FooterComponent { }

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [FooterComponent],
    declarations: [FooterComponent]
})
export class FooterModule { }