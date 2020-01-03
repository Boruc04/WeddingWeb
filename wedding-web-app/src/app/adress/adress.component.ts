import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [AdressComponent],
  imports: [
    CommonModule
  ]
})
export class AdressModule { }
