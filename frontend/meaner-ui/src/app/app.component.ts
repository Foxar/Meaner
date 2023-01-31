import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGE_JWT } from './constants/constants';
import { AppState } from './state/app.state';
import { validateJwt } from './state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  title = 'meaner-ui';


  ngOnInit(): void {
    const storageJwt = localStorage.getItem(STORAGE_JWT);

    

    if(storageJwt){
      console.log("Dispatching validate JWT");
      this.store.dispatch(validateJwt({jwt:storageJwt}));
    }
    
  }

}
