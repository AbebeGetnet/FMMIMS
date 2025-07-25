import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { NotificationComponent } from './Components/Modals/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  bsModalRef?: BsModalRef;

  constructor (private modalService: BsModalService){}

  showNotification(isSuccess: boolean, title:string, message:string){
    const initState: ModalOptions = {
      initialState:{
        isSuccess,
        title,
        message
      }
    };

    this.bsModalRef = this.modalService.show(NotificationComponent, initState);
  }
}
