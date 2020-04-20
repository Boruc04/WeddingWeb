import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DemoMaterialModule } from './material.module';

import { ConfirmComponent } from './confirm.component';

const appearance: MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

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
        ConfirmComponent
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: appearance
        }
    ]
})
export class ConfirmModule { }


