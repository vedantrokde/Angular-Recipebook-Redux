import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initState: State = {
  token: null,
  authenticated: false,
};

export function authReducer(
  state = initState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true,
      };
      break;
    case AuthActions.LOGOUT:
      return {
        ...initState
      };
      break;
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
      break;
    default:
      return state;
  }
}
