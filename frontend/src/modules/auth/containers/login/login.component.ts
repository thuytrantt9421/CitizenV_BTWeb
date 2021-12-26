import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResult } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { AuthApiService } from 'api/auth.api.service';
import { User } from 'models/user.model';
import { Subscription } from 'rxjs';
import axios from 'axios';
import { AuthStrategy, AUTH_STRATEGY } from '@modules/auth/components/auth.strategy';
import { tap } from 'rxjs/operators';
import { Login } from 'models/login.model';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    // Login form group
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    public isLoading = false;
    public instance = axios.create();

    // Create subscription for page
    private _subscription: Subscription;

    public user!: Login;
    public isCapsLock: boolean = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authApiService: AuthApiService,
        @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>

    ) {
        this._subscription = new Subscription();
    }
    ngOnInit() {
        this.initLoginForm();
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    public initLoginForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }

    public submitLogin() {
        const controls = this.loginForm.controls;

        if (this.loginForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAllAsTouched()
            );
            return;
        }

        this.isLoading = true;
        this.user = {
            user_name: controls.username.value,
            password: controls.password.value
        }
        const loginSubscription = this.authApiService.login(this.user).subscribe((res) => {
            this.isLoading = false;
            console.log(res);
            if(res.user_name) {
                this.authApiService.getCurrentUser$().subscribe((result) => {
                    console.log(result);
                });
                this.authApiService.isLoggedIn$().subscribe(((abc) => {
                    console.log(abc);
                }))
                this.router.navigate(['/app/dashboard'])
            } else if (res.message == 'password wrong') {
                alert("Sai mật khẩu!");
            } else {
                alert("Tài khoản hoặc mật khẩu không đúng!");
            }

        });

        this._subscription.add(loginSubscription);
    }

    // checkCaplock(event: any) {
    //     if (event && event.code && event.getModifierState('CapsLock')) {
    //         this.isCapsLock = true;
    //     } else {
    //         this.isCapsLock = false;
    //     }
    // }
}
