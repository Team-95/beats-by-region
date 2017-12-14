import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
    selector: 'modal-popup',
    templateUrl: 'modal.html',
})
export class ModalPopup {

   constructor(public viewCtrl: ViewController) {

   }

   dismiss() {
     this.viewCtrl.dismiss();
   }
}