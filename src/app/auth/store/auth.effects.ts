import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { from } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.TRY_SIGNUP),
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: { username: string; password: string }) => {
        return from(
          createUserWithEmailAndPassword(
            getAuth(),
            authData.username,
            authData.password
          )
        );
      }),
      switchMap(() => {
        return from(getAuth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/recipes']);
        return [
          {
            type: AuthActions.SIGNUP,
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token,
          },
        ];
      })
    );
  });

  signin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.TRY_SIGNIN),
      map((action: AuthActions.TrySignin) => {
        return action.payload;
      }),
      switchMap((authData: { username: string; password: string }) => {
        return from(
          signInWithEmailAndPassword(
            getAuth(),
            authData.username,
            authData.password
          )
        );
      }),
      switchMap(() => {
        return from(getAuth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/recipes']);
        return [
          {
            type: AuthActions.SIGNIN,
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token,
          },
        ];
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.TRY_LOGOUT),
      switchMap(() => {
        return from(signOut(getAuth()));
      }),
      map(() => {
        this.router.navigate(['/signin']);
        return {
          type: AuthActions.LOGOUT,
        };
      })
    );
  });

  constructor(private actions$: Actions, private router: Router) {}
}
