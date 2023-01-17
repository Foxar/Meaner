import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { AppState } from "src/app/state/app.state";
import { selectUser } from "src/app/state/user/user.selector";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss']
  })
  export class SettingsPageComponent {

    constructor(private store: Store<AppState>) {}

    currentUser$ = this.store.select(selectUser).pipe(tap(() => console.log("currentuser")),tap(console.log));

  }