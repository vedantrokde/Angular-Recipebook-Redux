import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNIN = 'SIGNIN';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const LOGOUT = 'LOGOUT';
export const TRY_LOGOUT = 'TRY_LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {username: string, password: string}) {}
}
export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {username: string, password: string}) {}
}
export class TryLogout implements Action {
  readonly type = TRY_LOGOUT;
}
export class Signup implements Action {
  readonly type = SIGNUP;
}
export class Signin implements Action {
  readonly type = SIGNIN;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type AuthActions = Signin | Signup | Logout | SetToken | TrySignup | TrySignin | TryLogout;
