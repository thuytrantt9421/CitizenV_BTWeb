import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'models/user.model';
import { LoginResult } from 'models/loginResult.model';
import { AuthStrategy, AUTH_STRATEGY } from '@modules/auth/components/auth.strategy';
import { ProvinceResult } from 'models/provinceResult.model';
import { Analysis } from 'models/analysis.model';

@Injectable({
    providedIn: 'root'
})

export class AnalysisApiService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    public analysis(id: string) {
        return this.httpClient.post<Analysis>('http://localhost:10000/api/thongke', {id: id}).pipe(map((res) => {
            return res;
        }))
    }
}
