import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStrategy, AUTH_STRATEGY } from '@modules/auth/components/auth.strategy';
import { UserService } from '@modules/auth/services';
import { AuthApiService } from 'api/auth.api.service';
@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: UserService, private authApiService: AuthApiService, private router: Router, @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>) { }
    username: string = '';
    hoten: string = '';
    ngOnInit() {
        this.auth.getCurrentUser().subscribe(res => {
            console.log(res);
            this.username = res;
        })
        this.authApiService.getUserName$().subscribe(res => {
            this.hoten = res;
        })
    }

    logout(): void {
        this.authApiService.logout().subscribe(res => {
            console.log(res);
            this.router.navigate(['/app/auth/login']);
        })
    }
}
