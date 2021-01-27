import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, FormGroupDirective, NgForm } from '@angular/forms';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { BaseComponent } from '../framework/components/base.component';
import { EmailService } from './service/email.service';
import { CustomResponse } from './service/email';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends BaseComponent implements OnInit, AfterViewInit {


  @ViewChild('guestNumber') guestNumberRef: ElementRef;
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  get email() { return this.confirmationFormGroup.get('mainEmail'); }
  get guestNumberFC() { return this.confirmationFormGroup.get('guestNumber'); }
  get needHotel() { return this.confirmationFormGroup.get('needHotel'); }
  get needDrive() { return this.confirmationFormGroup.get('needDrive'); }
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
    additionalInfo: '',
    needHotel: false,
    needDrive: false
  };

  guestFirstName(index: number) { return this.guestList[index].get('firstName'); }
  guestLastName(index: number) { return this.guestList[index].get('lastName'); }

  constructor(private emailService: EmailService, private snackBar: MatSnackBar) {
    super();

    this.emailService = emailService;
  }

  ngOnInit(): void {
    this.confirmationFormGroup = this.InitFormGroup();
  }

  ngAfterViewInit(): void {
    this.BindActionsToForm();
  }

  InitFormGroup(): FormGroup {
    return new FormGroup({
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
      ),
      needHotel: new FormControl(this.confirmationInitState.needHotel),
      needDrive: new FormControl(this.confirmationInitState.needDrive)
    });
  }

  BindActionsToForm() {
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

  ResetForm() {
    this.myForm.resetForm();
    this.confirmationFormGroup = this.InitFormGroup();
    this.BindActionsToForm();
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
          if (response.ok) {
            this.onSuccess();
          } else {
            this.onError();
          }
        }
      );
  }

  onError() {
    this.ResetForm();
    this.snackBar.open(
      'There was an error please try again later.',
      'ok',
      {
        duration: 2000,
        panelClass: ['snackbar-error']
      }
    );

  }

  onSuccess() {
    this.ResetForm();
    this.snackBar.open(
      'Dziękujemy!',
      'ok',
      {
        duration: 20000,
        panelClass: ['snackbar-success']
      }
    );
  }
}
