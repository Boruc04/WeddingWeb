import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from '../common/shared/shared.component';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent extends SharedComponent {

  constructor() {
    super();
  }

}

@NgModule({
  declarations: [AdressComponent],
  imports: [
    CommonModule
  ]
})
export class AdressModule { }
