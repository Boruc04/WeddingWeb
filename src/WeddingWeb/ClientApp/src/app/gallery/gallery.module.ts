import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';
import { GalleryComponent } from './components/angular2-image-gallery/gallery/gallery.component';
import { ViewerComponent } from './components/angular2-image-gallery/viewer/viewer.component';
import { ImageService } from './components/angular2-image-gallery/services/image.service';

@NgModule({
  declarations: [
    PhotoComponent,
    VideoComponent,
    GalleryComponent,
    ViewerComponent
  ],
  providers: [
    ImageService
  ],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }
