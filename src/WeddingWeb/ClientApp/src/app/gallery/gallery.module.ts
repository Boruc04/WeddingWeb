import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';

@NgModule({
  declarations: [
    PhotoComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    Angular2ImageGalleryModule
  ]
})
export class GalleryModule { }
