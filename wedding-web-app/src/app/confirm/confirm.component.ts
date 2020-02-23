import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ConfirmationItem } from './interfaces/confirmation-item';
import { GuestItem } from './interfaces/guest-item';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  emailFormControl;
  guestArray: Array<GuestItem>;
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

  wrtieToConsole(obj: any) {
    console.log(obj);
  }

  handleFormSubmit(form: NgForm) {
    console.log('Form Submited.');
    console.log(form);
    const confirmationItem = form.value as ConfirmationItem;
    console.log(confirmationItem);
  }

  createGuestsArray($event) {
    const guestNumber: number = +$event;
    this.guestArray = new Array<GuestItem>(guestNumber);
  }
}
