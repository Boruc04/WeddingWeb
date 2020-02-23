import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from './material.module';

import { ConfirmComponent } from './confirm.component';
import { GuestNumberComponent } from './guest-number.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    exports: [ConfirmComponent],
    declarations: [
        ConfirmComponent,
        GuestNumberComponent
    ]
})
export class ConfirmModule { }

