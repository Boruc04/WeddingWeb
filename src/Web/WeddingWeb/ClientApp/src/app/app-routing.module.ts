import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';
import { PhotoComponent } from './gallery/photo/photo.component';
import { VideoComponent } from './gallery/video/video.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'address', component: AddressComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: PhotoComponent },
  { path: 'video', component: VideoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
