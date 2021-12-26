import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@modules/auth/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    //Register form group
    public registerForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        copiedPassword: new FormControl('')
    })

    public isLoading = false;

    // Create subscription for page
    private _subscription: Subscription;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService
    ) {
        this._subscription = new Subscription();
    }

    ngOnInit() {
        this.initRegisterForm();
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    public initRegisterForm() {
        this.registerForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            copiedPassword: ['', Validators.compose([Validators.required])],
            fullname: ['', Validators.compose([Validators.required])],
            phoneNumber: ['', Validators.compose([Validators.required])]
        })
    }

    public submitRegister() {
        const controls = this.registerForm.controls;

        if (this.registerForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAllAsTouched()
            );
            return;
        }

        this.isLoading = true;


    }
}
