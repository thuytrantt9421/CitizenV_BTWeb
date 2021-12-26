import { HttpClient } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { config } from "@app/core/config";
import { Account } from "models/account.model";
import { User } from "models/user.model";
import { Observable } from "rxjs";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { SessionAuthStrategy } from "./session-auth.strategy";

export interface AuthStrategy<T> {

  doLoginUser(data: T, quyen: T, hoten: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<string>;

  getUserRole(): Observable<string>;

  getUserPermisson(): Observable<string>;

  getUserName(): Observable<string>;

}

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>('AuthStrategy');

export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: (http: HttpClient) => {
    switch (config.auth) {
        case 'session':
          return new SessionAuthStrategy(http);
        case 'token':
          return new JwtAuthStrategy();
      }
  }
};
