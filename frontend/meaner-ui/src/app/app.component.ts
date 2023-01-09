import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { STORAGE_JWT } from './constants/constants';
import { AppState } from './state/app.state';
import { validateJwt } from './state/user/user.actions';
import { selectUser, selectUserState, selectUserStatus } from './state/user/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
