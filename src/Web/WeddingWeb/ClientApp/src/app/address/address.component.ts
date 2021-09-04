import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../framework/components/base.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent {

  constructor() {
    super();
  }

}

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule
  ]
})
export class AddressModule { }
