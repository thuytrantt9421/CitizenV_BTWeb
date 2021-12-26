import { HttpClient } from "@angular/common/http";
import { config } from "@app/core/config";
import { Account } from "models/account.model";
import { LoginResult } from "models/loginResult.model";
import { User } from "models/user.model";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthStrategy } from "./auth.strategy";

export class SessionAuthStrategy implements AuthStrategy<any> {

    private loggedUser: string = '';

    constructor(private http: HttpClient) { }

    doLoginUser(user_name: string, quyen: string, hoten: string): void {
        this.loggedUser = user_name;
        this.setCookie('token', user_name, 1, '/app');
        this.setCookie('permisson', quyen, 1, '/app');
        this.setCookie('hoten', hoten, 1, '/app');
    }

    doLogoutUser(): void {
        this.loggedUser = '';
        this.deleteCookie('token');
        this.deleteCookie('permisson');
    }

    getCurrentUser(): Observable<string> {
        // if (this.loggedUser) {
        //     return of(this.loggedUser);
        // } else {
        //     return of('');
        // }
        if (document.cookie) {
            return of(this.getCookie('token'));
        } else {
            return of('');
        }
    }

    getUserRole(): Observable<string> {
        if (document.cookie) {
            const temp = this.getCookie('token');
            if (temp === 'admin') {
                return of("A1");
            }
            if (temp.length === 2) {
                return of("A2");
            } else if (temp.length === 4) {
                return of("A3");
            } else if (temp.length === 6) {
                return of("B1");
            } else {
                return of("B2");
            }
        } else {
            return of('');
        }
    }

    getUserPermisson(): Observable<string> {
        if (document.cookie) {
            const temp = this.getCookie('permisson');
            if (temp === 'YES') {
                return of("CÓ");
            } else {
                return of("Không");
            }
        } else {
            return of('');
        }
    }

    getUserName(): Observable<string> {
        if(document.cookie) {
            const temp = this.getCookie('hoten');
            return of(temp);
        } else {
            return of('');
        }
    }

    private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    private setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires: string = `expires=${d.toUTCString()}`;
        let cpath: string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

    private deleteCookie(name: string) {
        this.setCookie(name, '', -1);
    }
}
