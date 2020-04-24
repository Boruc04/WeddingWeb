import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { BaseComponent } from '../common/shared/base.component';
import { ApiService } from './service/api.service';
import { Email } from './service/email';

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
  get guestList() { return (this.confirmationFormGroup.get('guestList') as FormArray).controls; }
  get minGuestNumber() { return 1; }
  get maxGuestNumber() { return 10; }
  get minTextLength() { return 1; }
  get maxTextLength() { return 256; }
  confirmationFormGroup: FormGroup;

  confirmation = {
    email: '',
    guestsNumber: null,
    guestList: []
  };

  apiService: ApiService;

  guestFirstName(index: number) { return this.guestList[index].get('firstName'); }
  guestLastName(index: number) { return this.guestList[index].get('lastName'); }


  constructor(apiService: ApiService) {
    super();

    this.apiService = apiService;
  }

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
        ]),
      guestList: new FormArray([])
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
      const guestListFormArray = this.confirmationFormGroup.get('guestList') as FormArray;
      guestListFormArray.clear();
      for (let index = 0; index < guestNumber; index++) {

        this.confirmation.guestList.push({
          firstName: '',
          lastName: ''
        });
        guestListFormArray.push(new FormGroup({
          firstName: new FormControl(
            this.confirmation.guestList[index].firstName,
            [
              Validators.required,
              Validators.minLength(this.minTextLength),
              Validators.maxLength(this.maxTextLength)
            ]),
          lastName: new FormControl(
            this.confirmation.guestList[index].lastName,
            [
              Validators.required,
              Validators.minLength(this.minTextLength),
              Validators.maxLength(this.maxTextLength)
            ])
        }));
      }
    }
  }

  onSubmit(form: FormGroup) {
    const confirmationItem = form.value;
    console.log(confirmationItem);
    const email = new Email();
    this.apiService.sendEmail(email);
  }
}
