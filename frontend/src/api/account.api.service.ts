import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'models/user.model';
import { AccountResult } from 'models/AccoutResult.model';

@Injectable({
    providedIn: 'root'
})

export class AccountApiService {
    constructor(
        private httpClient: HttpClient,
    ) { }

        // public currClick$ = new BehaviorSubject<>

    public getInfoAccount(user_name: string) {
        return this.httpClient.post<AccountResult>('http://localhost:10000/api/thongtinnguoidungcapduoi', {tai_khoan: user_name}).pipe(map((res) => {
            return res;
        }))
    }

    public addAccount(user: User) {
        return this.httpClient.post('http://localhost:10000/api/captaikhoan', user).pipe(map((res) => {
            return res;
        }))
    }

    public permission(id: string, start_date: string, end_date: string) {
        return this.httpClient.post('http://localhost:10000/api/capquyenkhaibao', {id, start_date, end_date}).pipe(map((res) => {
            return res;
        }))
    }

    public editPermisson(tk: string, permission: string) {
        return this.httpClient.post('http://localhost:10000/api/capquyenkhaibaotk', {id: tk, quyen: permission}).pipe(map((res) => {
            return res;
        }))
    }
}
