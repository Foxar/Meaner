import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, tap } from "rxjs";
import { AppState } from "../state/app.state";
import { User } from "../state/user/user.model";
import { selectUser } from "../state/user/user.selector";

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor (public store: Store<AppState>, public router: Router) {}

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(selectUser).pipe(
            tap(console.log),
            map((currentUser: User | null) => {
                if(currentUser && currentUser.id == route.params['userId'])
                {
                    this.router.navigate(['/login']);
                    return true;
                }
                else
                {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        )
    }
    
    
}