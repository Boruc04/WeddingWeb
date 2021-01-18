import { Component, NgModule, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { VersionService } from './service/version.service';
import { Version } from './service/version';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    
    version: string = "0.0.0.0";

    constructor (private versionService: VersionService){}

    ngOnInit(): void {
        this.versionService.getAppVersion().subscribe(
            (response: Version) => {
                this.version = response.value;
            }
        );
    }
}

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [FooterComponent],
    declarations: [FooterComponent],
    providers: [
        VersionService
    ]
})
export class FooterModule { }