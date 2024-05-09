import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario.component';



@NgModule({
  declarations: [
    FormularioComponent],
  imports: [
    CommonModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class FormularioModule { }
