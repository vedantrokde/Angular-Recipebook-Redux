import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { State } from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            switchMap(
                (authState: State) => {
                    const authReq = req.clone({ params: req.params.set('auth', authState.token) });
                    return next.handle(authReq);
                }
            )
        );
    }
}