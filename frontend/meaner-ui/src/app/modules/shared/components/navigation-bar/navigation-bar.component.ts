import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectUser } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(public store: Store<AppState>) { }

  currentUser$ = this.store.select(selectUser).pipe(tap(console.log));

  ngOnInit(): void {
  }

}
