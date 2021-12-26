import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'models/user.model';
import { LoginResult } from 'models/loginResult.model';
import { AuthStrategy, AUTH_STRATEGY } from '@modules/auth/components/auth.strategy';
import { ProvinceResult } from 'models/provinceResult.model';
import { PopulationResult } from 'models/PopulationResult.model';
import { Person } from 'models/person.model';

@Injectable({
    providedIn: 'root'
})

export class PopulationApiService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    public currentPerson$ = new BehaviorSubject<Person>({
      cccd: '',
      hoten: '',
      gioitinh: '',
      ngaysinh: '',
      quequan: '',
      diachi_thuongtru: '',
      diachi_tamtru: '',
      tongiao: '',
      trinhdo: '',
      nghenghiep: '',
      id_xom: ''
    })

    public getDS(idii: string, name?: string, cccd?: string) {
        return this.httpClient.post<PopulationResult>('http://localhost:10000/api/getAllDan', {id: idii, hoten: name || null, cccd: cccd || null}).pipe(map((res) => {
            return res;
        }))
    }

    public addPerson(person: Person) {
        return this.httpClient.post<PopulationResult>('http://localhost:10000/api/them_dan', person).pipe(map((res) => {
            return res;
        }))
    }

    public editPerson(person: Person) {
        return this.httpClient.post<PopulationResult>('http://localhost:10000/api/suanguoidan', person).pipe(map((res) => {
            return res;
        }))
    }

    public deletePerson(cccd: string) {
        return this.httpClient.post<PopulationResult>('http://localhost:10000/api/xoanguoidan', {cccd: cccd}).pipe(map((res) => {
            return res;
        }))
    }
}
