import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NavBarModule } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.component';
import { AddressModule } from './address/address.component';
import { ConfirmModule } from './confirm/confirmation.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FrameworkModule } from './framework/framework.module';
import { AppInjector } from './app-injector.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FrameworkModule,
    NavBarModule,
    FooterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AddressModule,
    ConfirmModule
  ],
  providers: []
})
export class AppModule {

  constructor(private injector: Injector) { }

  /**
   * The reason for manual bootstraping is because of need for an injector.
   * It could not stay inside the main.ts because base.component was loading faster than bootstrap ends and service resolution fail.
   * @param applicationRef 
   */
  ngDoBootstrap(applicationRef: ApplicationRef) {
    AppInjector.getInstance().setInjector(this.injector);
    applicationRef.bootstrap(AppComponent);
  }
}
