import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { NavBarModule } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.component';
import { AddressModule } from './address/address.component';
import { ConfirmModule } from './confirm/confirmation.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AppInjector } from './app-injector.service';
import { FrameworkModule } from './framework/framework.module';
import { GalleryModule } from './gallery/gallery.module';
import { AppRoutingModule } from './app-routing.module';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

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
    ConfirmModule,
    GalleryModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: 'a83cd422-8341-438b-a4cb-81b855b705bd', // This is your client ID
        authority: 'https://login.microsoftonline.com/c5ee535a-1291-4ccd-a095-a993352febf4', // This is your tenant ID
        redirectUri: 'https://localhost:5001/'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://localhost:5001/api/image/', ['api://a83cd422-8341-438b-a4cb-81b855b705bd/access_as_user']],
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ]
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
    applicationRef.bootstrap(MsalRedirectComponent);
  }
}
