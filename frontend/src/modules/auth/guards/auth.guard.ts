// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
// import { Observable, of } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     canActivate(): Observable<boolean> {
//         return of(true);
//     }
// }
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthApiService } from 'api/auth.api.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authApiService: AuthApiService) { }

    canActivate(): Observable<boolean> {
        // return this.authApiService.isLoggedIn$().pipe(
        //   tap(isLoggedIn => {
        //     if (!isLoggedIn) { this.router.navigate(['/auth/login']); }
        //   })
        // );
        if(document.cookie) {
            return of(true);
        }

        this.router.navigate(['/app/auth/login']);
        return of(false);
      }
}
