import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { resetUser } from 'src/app/state/user/user.actions';
import { User } from 'src/app/state/user/user.model';
import { selectUser } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-user-pin',
  templateUrl: './user-pin.component.html',
  styleUrls: ['./user-pin.component.scss']
})
export class UserPinComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  user: User | null = null;

  ngOnInit(): void {
    this.store.select(selectUser).pipe(tap(console.log)).subscribe(u => {
      this.user=u;
    });
  }
  

  logout(): void {
    this.store.dispatch(resetUser());
  }

}
