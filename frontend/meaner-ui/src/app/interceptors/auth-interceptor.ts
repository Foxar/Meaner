import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { STORAGE_JWT } from "../constants/constants";

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = localStorage.getItem(STORAGE_JWT) || '';
        req = req.clone({ headers: req.headers.set('Authorization', jwt)})

        return next.handle(req);
    }
}
