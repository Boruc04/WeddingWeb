import { Component, OnInit, NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .navbar-header {
      display: flex;
      align-items: center;
    }

    .navbar-button {
      justify-content: center;
      flex-grow: 1;
    }
  `]
})
export class NavbarComponent { }


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
  exports: [NavbarComponent, FooterComponent],
  declarations: [NavbarComponent, FooterComponent]
})
export class NavBarModule { }