import { Component } from '@angular/core';
import { SharedComponent } from '../common/shared/shared.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends SharedComponent {

  constructor() {
    super();
  }

}
