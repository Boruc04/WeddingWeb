import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    PhotoComponent,
    VideoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }
