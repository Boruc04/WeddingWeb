import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const IMAGE_ENDPOINT = 'https://localhost:5001/api/image/preview_xxs/8a675a01-ba39-4407-9526-9502550db218';


type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  profile!: ProfileType;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getImage();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        console.log(profile);
        this.profile = profile;
      });
  }

  getImage() {
    this.http.get(IMAGE_ENDPOINT)
      .subscribe(image => {
        console.log(image);
      });
  }
}
