import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NavBarModule } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.component';
import { AddressModule } from './address/address.component';
import { ConfirmModule } from './confirm/confirmation.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoggingService } from './framework/logging/logging.service';
import { FrameworkModule } from './framework/framework.module';
import { ErrorHandlerService } from './framework/errorhandling/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    NavBarModule,
    FooterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AddressModule,
    ConfirmModule,
    FrameworkModule
  ],
  providers: [
    LoggingService,
    { provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
