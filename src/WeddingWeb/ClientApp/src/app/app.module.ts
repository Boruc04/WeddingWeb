import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NavBarModule } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.component';
import { AddressModule } from './address/address.component';
import { ConfirmModule } from './confirm/confirmation.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BaseComponent } from './common/shared/base.component';
import { MyMonitoringService } from './services/monitoring.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BaseComponent
  ],
  imports: [
    NavBarModule,
    FooterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AddressModule,
    ConfirmModule
  ],
  providers: [MyMonitoringService, { provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
