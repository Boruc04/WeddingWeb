import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'app-guest-number',
    template: `
                    <mat-form-field appearance="legacy" class="full-width">
                        <input matInput #guestNumber type="number" [placeholder]="placeholderTitle"
                            [formControl]="guestNumberFormControl" required>
                        <mat-hint>Pamiętaj żeby policzyć siebie :)</mat-hint>
                        <mat-error *ngIf="guestNumberFormControl.hasError('required')">
                            Liczba gości jest wymagana.
                        </mat-error>
                        <mat-error
                            *ngIf="!guestNumberFormControl.hasError('required') && guestNumberFormControl.hasError('pattern')">
                            Błędna liczba gości.
                        </mat-error>
                    </mat-form-field>
    `,
    styles: []
})
export class GuestNumberComponent implements AfterViewInit {

    guestNumberFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern('(?![0]{1,}$)\\d{1,}')
    ]);

    @Input() placeholderTitle = 'Podaj całkowitą liczbę gości';
    @Output() guestNumberEmitter = new EventEmitter<number>();
    @ViewChild('guestNumber') guestNumberRef: ElementRef;

    ngAfterViewInit(): void {
        const guestNumber = this.guestNumberRef.nativeElement;
        fromEvent(guestNumber, 'keyup')
            .pipe(
                map((ev: any) => ev.target.value),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(this.guestNumberEmitter);
    }
}
