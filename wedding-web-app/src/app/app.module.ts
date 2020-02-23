import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NavBarModule } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.component';
import { AdressModule } from './adress/adress.component';
import { ConfirmModule } from './confirm/confirmation.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SharedComponent } from './common/shared/shared.component';
import { MyMonitoringService } from './services/monitoring.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    SharedComponent
  ],
  imports: [
    NavBarModule,
    FooterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdressModule,
    ConfirmModule
  ],
  providers: [MyMonitoringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
