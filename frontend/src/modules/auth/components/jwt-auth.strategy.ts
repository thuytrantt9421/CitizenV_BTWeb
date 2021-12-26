import { Token } from "@angular/compiler";
import { Account } from "models/account.model";
import { User } from "models/user.model";
import { Observable, of } from "rxjs";
import { AuthStrategy } from "./auth.strategy";

export class JwtAuthStrategy implements AuthStrategy<any> {

    private readonly JWT_TOKEN = 'JWT_TOKEN';

    doLoginUser(token: any): void {
        localStorage.setItem(this.JWT_TOKEN, token);
    }

    doLogoutUser(): void {
        localStorage.removeItem(this.JWT_TOKEN);
    }

    getCurrentUser(): Observable<string> {
        const token = this.getToken();
        if (token) {
            const encodedPayload = token.split('.')[1];
            const payload = window.atob(encodedPayload);
            return of(JSON.parse(payload));
        } else {
            return of();
        }
    }

    getUserRole(): Observable<string> {
        const token = this.getToken();
        if (token) {
            const encodedPayload = token.split('.')[1];
            const payload = window.atob(encodedPayload);
            return of(JSON.parse(payload));
        } else {
            return of();
        }
    }
    getUserPermisson(): Observable<string> {
        const token = this.getToken();
        if (token) {
            const encodedPayload = token.split('.')[1];
            const payload = window.atob(encodedPayload);
            return of(JSON.parse(payload));
        } else {
            return of();
        }
    }
    getUserName(): Observable<string> {
        const token = this.getToken();
        if (token) {
            const encodedPayload = token.split('.')[1];
            const payload = window.atob(encodedPayload);
            return of(JSON.parse(payload));
        } else {
            return of();
        }
    }

    getToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }
}
