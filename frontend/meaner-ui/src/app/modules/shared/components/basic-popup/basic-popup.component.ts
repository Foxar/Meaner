import { Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export enum BasicPopupType {
  POPUP_SUCCESS = 'SUCCESS',
  POPUP_FAILURE = 'FAILURE',
  POPUP_NEUTRAL = 'NEUTRAL',
}

export interface BasicPopupConfig {
  type: BasicPopupType,
  message: string,
}


@Component({
  selector: 'app-basic-popup',
  templateUrl: './basic-popup.component.html',
  styleUrls: ['./basic-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BasicPopupComponent {
  BasicPopupType = BasicPopupType;

  type: BasicPopupType = BasicPopupType.POPUP_NEUTRAL;
  message: string;
  snackBarRef = inject(MatSnackBarRef);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: BasicPopupConfig) { 
    this.type = data.type;
    this.message = data.message;
  }

  getClass(){
    switch(this.type){
      case BasicPopupType.POPUP_FAILURE:
        return 'popup-failed';
      case BasicPopupType.POPUP_SUCCESS:
        return 'popup-success';
      default:
        return ''

    }
  }
}
