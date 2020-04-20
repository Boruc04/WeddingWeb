import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { ConfirmationItem } from './interfaces/confirmation-item';
import { GuestItem } from './interfaces/guest-item';
import { BaseComponent } from '../common/shared/base.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild('guestNumber')
  guestNumberRef: ElementRef;

  get email() { return this.confirmationFormGroup.get('email'); }
  get guestNumberFC() { return this.confirmationFormGroup.get('guestNumber'); }
  get minGuestNumber() { return 1; }
  get maxGuestNumber() { return 10; }
  confirmationFormGroup: FormGroup;
  guestArray: Array<GuestItem>;

  confirmation = {
    email: '',
    guestsNumber: null,
    guestList: []
  };

  ngOnInit(): void {
    this.confirmationFormGroup = new FormGroup({
      email: new FormControl(
        this.confirmation.email,
        [
          Validators.required,
          Validators.email
        ]),
      guestNumber: new FormControl(
        this.confirmation.guestsNumber,
        [
          Validators.required,
          Validators.min(this.minGuestNumber),
          Validators.max(this.maxGuestNumber)
        ])
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.guestNumberRef.nativeElement, 'keyup')
      .pipe(
        map((ev: any) => ev.target.value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(event => {
        this.createGuestsArray(+event);
      });
  }

  createGuestsArray(guestNumber: number) {
    if (this.confirmationFormGroup.get('guestNumber').valid) {
      this.guestArray = new Array<GuestItem>(guestNumber);
    }
  }

  handleFormSubmit(form: NgForm) {
    console.log('Form Submited.');
    console.log(form);
    const confirmationItem = form.value as ConfirmationItem;
    console.log(confirmationItem);
  }
}
