import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'models/user.model';
import { LoginResult } from 'models/loginResult.model';
import { Account } from 'models/account.model';
import axios from 'axios';
import { AuthStrategy, AUTH_STRATEGY } from '@modules/auth/components/auth.strategy';
import { Login } from 'models/login.model';

@Injectable({
    providedIn: 'root'
})

export class AuthApiService {
    constructor(
        private httpClient: HttpClient,
        @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
    ) { }

    // public currentUser$ = new BehaviorSubject<Account>({
    //     code: 'string',
    //     password: 'string',
    //     name: 'string',
    //     role: 'string',
    //     permission: false
    // })

    public currentUser$ = new BehaviorSubject<LoginResult>({
        message: '',
        hoten: '',
        user_name: '',
        email: '',
        quyen: ''
    })

    public currUser$ = new BehaviorSubject<string>('');
    headers = new HttpHeaders();
    public login(user: Login) {

        return this.httpClient.post<LoginResult>('http://localhost:10000/api/login', user).pipe(map((res) => {
            this.auth.doLoginUser(res.user_name, res.quyen, res.hoten);
            this.currentUser$.next(res);
            return res;
        })
        );

    }

    public logout() {
        return this.httpClient.get('http://localhost:10000/api/logout').pipe(map((res) => {
            this.auth.doLogoutUser();
            return res;
        }));
    }

    isLoggedIn$(): Observable<boolean> {
        return this.auth.getCurrentUser().pipe(
            map(user => !!user),
            catchError(() => of(false))
        );
    }

    getCurrentUser$(): Observable<string> {
        return this.auth.getCurrentUser();
    }

    getUserRole$(): Observable<string> {
        return this.auth.getUserRole();
    }

    getUserPermisson$(): Observable<string> {
        return this.auth.getUserPermisson();
    }

    getCurrUser$(): Observable<LoginResult> {
        return this.currentUser$.pipe(map((res) => {
            return res;
        }))
    }

    getUserName$(): Observable<string> {
        return this.auth.getUserName();
    }

    private doLogoutUser() {
        this.auth.doLogoutUser();
    }
}
