import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ProvinceResult } from 'models/provinceResult.model';
import { BehaviorSubject } from 'rxjs';
import { Province } from 'models/province.model';

@Injectable({
    providedIn: 'root'
})

export class ProvinceApiService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    public dsTinh$ = new BehaviorSubject<Province[]>([]);
    public dsHuyen$ = new BehaviorSubject<Province[]>([]);
    public dsXa$ = new BehaviorSubject<Province[]>([]);
    public dsXom$ = new BehaviorSubject<Province[]>([]);
    public getDS(id: string) {
        return this.httpClient.post<ProvinceResult>('http://localhost:10000/api/ds', {id: id}).pipe(map((res) => {
            return res;
        }))
    }

    public add(id: string, name: string) {
        return this.httpClient.post<ProvinceResult>('http://localhost:10000/api/khaibao', {id: id, ten: name}).pipe(map((res) => {
            return res;
        }))
    }
}
