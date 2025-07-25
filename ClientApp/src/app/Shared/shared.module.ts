import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './Components/not-found/not-found/not-found.component';
import { ValidationMessagesComponent } from './Components/errors/validation-messages/validation-messages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NotificationComponent } from './Components/Modals/notification/notification.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  exports:[
    RouterModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    ValidationMessagesComponent
  ]
})
export class SharedModule { }
