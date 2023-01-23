import { Component, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, tap } from "rxjs";
import { AppState } from "src/app/state/app.state";
import { selectUser } from "src/app/state/user/user.selector";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss']
  })
  export class SettingsPageComponent implements OnDestroy {

    constructor(
      private store: Store<AppState>,
      private router: Router,
      ) {}

    currentUser$ = this.store.select(selectUser).pipe(tap(() => console.log("currentuser")),tap(console.log));
    routerEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((event) => {
        this.categoryChosen = (event as NavigationEnd).url.split("/").at(-1);
      })
    ).subscribe();


    categoryChosen: string | undefined;

    ngOnDestroy(): void {
      this.routerEvents$.unsubscribe();  
    }

  }