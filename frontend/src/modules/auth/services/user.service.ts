import { Injectable, Input } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { LoginResult } from '../models';

const userSubject: ReplaySubject<LoginResult> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor() {
        // this.user = {
        //     errorCode: this.users.errorCode,
        //     message: this.users.message,
        //     user: {
        //         fullname: this.users.user.fullname,
        //         username: this.users.user.username,
        //         email: this.users.user.email
        //     }
        // }
    }

    set user(user: LoginResult) {
        userSubject.next(user);
    }

    get user$(): Observable<LoginResult> {
        return userSubject.asObservable();
    }
}
