import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, tap } from "rxjs";
import { STORAGE_JWT } from "../constants/constants";
import { AppState } from "../state/app.state";
import { User } from "../state/user/user.model";
import { validateJwt } from '../state/user/user.actions';
import { selectUser } from "../state/user/user.selector";

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor (public store: Store<AppState>, public router: Router) {}

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        const storageJwt = localStorage.getItem(STORAGE_JWT) ?? '';
        this.store.dispatch(validateJwt({jwt: storageJwt}))
        return this.store.select(selectUser).pipe(
            tap(console.log),
            map((currentUser: User | null) => {

                if(currentUser){
                    return true;
                }else {
                    return this.router.createUrlTree(['/login']);
                }
            })
        )
    }
    
    
}