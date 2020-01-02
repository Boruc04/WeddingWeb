import { Component, NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { }

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})
export class NavBarModule { }