import { Action } from '@ngrx/store';
import { LoginResult } from '../models';

export const ActionTypes = {
  CHECK_LOGIN: 'CHECK LOGIN',
  LOGOUT: 'LOGOUT',
};
export class CheckLoginAction implements Action {
  type = ActionTypes.CHECK_LOGIN;
  constructor(public payload: LoginResult) {}
}
export class LogoutLoginAction implements Action {
  type = ActionTypes.LOGOUT;
  constructor() {}
}

export type Actions = CheckLoginAction;
