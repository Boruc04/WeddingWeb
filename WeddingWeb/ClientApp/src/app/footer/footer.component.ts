import { Component, NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
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