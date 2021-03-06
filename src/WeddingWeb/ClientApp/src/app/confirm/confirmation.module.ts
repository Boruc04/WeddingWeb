import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule, MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DemoMaterialModule } from './material.module';

import { ConfirmComponent } from './confirm.component';
import { EmailService } from './service/email.service';
import { HttpErrorHandler } from './service/http-error-handler.service';
import { MessageService } from './service/message.service';

const appearance: MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

@NgModule({
    imports: [
        MatFormFieldModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule
    ],
    exports: [ConfirmComponent],
    declarations: [
        ConfirmComponent
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: appearance
        },
        EmailService,
        HttpErrorHandler,
        MessageService
    ]
})
export class ConfirmModule { }


