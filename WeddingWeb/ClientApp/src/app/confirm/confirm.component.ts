import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { BaseComponent } from '../common/shared/base.component';
import { EmailService } from './service/email.service';
import { CustomResponse, Email } from './service/email';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends BaseComponent implements OnInit, AfterViewInit {


  @ViewChild('guestNumber')
  guestNumberRef: ElementRef;

  get email() { return this.confirmationFormGroup.get('mainEmail'); }
  get guestNumberFC() { return this.confirmationFormGroup.get('guestNumber'); }
  get guestList() { return (this.confirmationFormGroup.get('guestList') as FormArray).controls; }
  get minGuestNumber() { return 1; }
  get maxGuestNumber() { return 10; }
  get minTextLength() { return 1; }
  get maxTextLength() { return 256; }
  confirmationFormGroup: FormGroup;

  confirmationInitState = {
    mainEmail: '',
    guestsNumber: null,
    guestList: [],
    additionalInfo: ''
  };

  guestFirstName(index: number) { return this.guestList[index].get('firstName'); }
  guestLastName(index: number) { return this.guestList[index].get('lastName'); }

  constructor(private emailService: EmailService) {
    super();

    this.emailService = emailService;
  }

  ngOnInit(): void {
    this.confirmationFormGroup = new FormGroup({
      mainEmail: new FormControl(
        this.confirmationInitState.mainEmail,
        [
          Validators.required,
          Validators.email
        ]),
      guestNumber: new FormControl(
        this.confirmationInitState.guestsNumber,
        [
          Validators.required,
          Validators.min(this.minGuestNumber),
          Validators.max(this.maxGuestNumber)
        ]),
      guestList: new FormArray([]),
      additionalInfo: new FormControl(
        this.confirmationInitState.additionalInfo,
        Validators.max(500)
      )
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

        this.confirmationInitState.guestList.push({
          firstName: '',
          lastName: ''
        });
        guestListFormArray.push(new FormGroup({
          firstName: new FormControl(
            this.confirmationInitState.guestList[index].firstName,
            [
              Validators.required,
              Validators.minLength(this.minTextLength),
              Validators.maxLength(this.maxTextLength)
            ]),
          lastName: new FormControl(
            this.confirmationInitState.guestList[index].lastName,
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
    this.emailService.sendEmail(form.value)
      .subscribe(
        (response: CustomResponse) => {
          console.log(response);

          if (response.ok) {
            this.onSuccess();
          } else {
            this.onError();
          }
        }
      );
  }

  onError() {
    alert('There was an error please try again later.');
  }

  onSuccess() {
    alert('Success');
  }
}
