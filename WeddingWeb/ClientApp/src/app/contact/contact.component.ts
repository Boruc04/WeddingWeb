import { Component } from '@angular/core';
import { BaseComponent } from '../common/shared/base.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent {

  constructor() {
    super();
  }

}
