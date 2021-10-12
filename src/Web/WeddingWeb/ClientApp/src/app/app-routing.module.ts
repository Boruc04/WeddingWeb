import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';
import { PhotoComponent } from './gallery/photo/photo.component';
import { VideoComponent } from './gallery/video/video.component';
import { MsalGuard } from '@azure/msal-angular';
import { CanLoadPhotoAndVideoGuard } from './framework/guards/CanLoadPhotoAndVideoGuard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'address', component: AddressComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: PhotoComponent, canActivate: [MsalGuard], canLoad: [] },
  { path: 'video', component: VideoComponent, canActivate: [CanLoadPhotoAndVideoGuard] }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabled' : 'disabled', // Don't perform initial navigation in iframes
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
