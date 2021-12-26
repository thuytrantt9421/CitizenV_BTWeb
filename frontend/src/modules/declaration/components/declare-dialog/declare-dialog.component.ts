import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountApiService } from 'api/account.api.service';
import { ProvinceApiService } from 'api/listProvince.api,service';
import { Account } from 'models/account.model';
import { User } from 'models/user.model';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './declare-dialog.component.html',
    styleUrls: ['declare-dialog.component.scss'],
})
export class DeclareDialogComponent implements OnInit {

    filterFormValid!: FormGroup;
    result!: User;
    quyen: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public dialogRef: MatDialogRef<DeclareDialogComponent>,
        private accountApiService: AccountApiService,
        private provinceApiService: ProvinceApiService,
        @Inject(MAT_DIALOG_DATA) public data: Account,
    ) { }
    ngOnInit() {
        this.filterFormValid = this.fb.group({
            donvi: [''],
            tai_khoan: [''],
            mat_khau: [''],
            ho_ten: [''],
            sdt: [''],
            email: [''],
            dia_chi: [''],
        })
    }

    addUser() {
        debugger
        const controls = this.filterFormValid.controls;
        this.provinceApiService.add(controls.tai_khoan.value, controls.donvi.value).subscribe(res => {
            console.log(res);
        })
        this.result = {
            tai_khoan: controls.tai_khoan.value,
            mat_khau: controls.mat_khau.value,
            ho_ten: controls.ho_ten.value,
            sdt: controls.sdt.value,
            email: controls.email.value,
            dia_chi: controls.dia_chi.value
        }

        // if(this.quyen === true) {
        //     this.result.quyen = "YES";
        // } else {
        //     this.result.quyen = "NO";
        // }

        this.accountApiService.addAccount(this.result).subscribe(res => {
            console.log(res);
        })
        alert("Thêm mới tài khoản thành công!")
        this.dialogRef.close();

    }

    capQuyen() {
        this.quyen = !this.quyen;
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
