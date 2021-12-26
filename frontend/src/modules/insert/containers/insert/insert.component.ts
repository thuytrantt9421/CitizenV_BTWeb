import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'api/auth.api.service';
import { ProvinceApiService } from 'api/listProvince.api,service';
import { PopulationApiService } from 'api/population.api.service';
import { Person } from 'models/person.model';
import { Province } from 'models/province.model';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './insert.component.html',
    styleUrls: ['insert.component.scss'],
})
export class InsertComponent implements OnInit {

    public addPersonForm!: FormGroup;
    public listProvince!: Province[];
    public listQuan!: Province[];
    public listXa!: Province[];
    public listXom!: Province[];
    public gender = ['Nam', 'Nữ'];
    public data!: Person;
    role: string = '';
    display: boolean = true;

    constructor(
        private fb: FormBuilder,
        private provinceApiService: ProvinceApiService,
        private populationApiService: PopulationApiService,
        private authApiService: AuthApiService
    ) {}

    ngOnInit() {
        this.addPersonForm = this.fb.group({
            cccd: ['', Validators.required],
            name: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            birthplace: ['', Validators.required],
            permanentAddress: ['', Validators.required],
            tempAddress: ['', Validators.required],
            region: ['', Validators.required],
            eduLevel: ['', Validators.required],
            profession: ['', Validators.required],
            tinh: [''],
            huyen: [''],
            xa: [''],
            xom: ['', Validators.required]
        })
        this.provinceApiService.getDS("").subscribe(res => {
            console.log(res.ds);
            this.listProvince = res.ds!;
        })
        this.Role();
    }

    initForm() {
        const controls = this.addPersonForm.controls;

        if(controls.tinh.value) {
            this.provinceApiService.getDS(controls.tinh.value).subscribe(res => {
                this.listQuan = res.ds!;
            })
        }
        if(controls.huyen.value) {
            this.provinceApiService.getDS(controls.huyen.value).subscribe(res => {
                this.listXa = res.ds!;
            })
        }
        if(controls.xa.value) {
            this.provinceApiService.getDS(controls.xa.value).subscribe(res => {
                this.listXom = res.ds!;
            })
        }
    }
    get controls() {
        return this.addPersonForm.controls;
      }

    addPerson() {
        console.log(this.controls);
        if(this.addPersonForm.invalid) {
            Object.keys(this.controls).forEach(controlName =>
                this.controls[controlName].markAllAsTouched()
            );
            return;
        }

        this.data = {
            cccd: this.controls.cccd.value,
            hoten: this.controls.name.value,
            gioitinh: this.controls.gender.value,
            ngaysinh: this.controls.dob.value,
            quequan: this.controls.birthplace.value,
            diachi_thuongtru: this.controls.permanentAddress.value,
            diachi_tamtru: this.controls.tempAddress.value,
            tongiao: this.controls.region.value,
            trinhdo: this.controls.eduLevel.value,
            nghenghiep: this.controls.profession.value,
            id_xom: this.controls.xom.value

        }
        this.authApiService.getUserPermisson$().subscribe(res => {
            if(res == 'Có') {
                this.populationApiService.addPerson(this.data).subscribe(res => {
                    console.log(res);
                    if(res.message === 'success') {
                        alert('Nhập liệu thành công!');
                    }
                })
            } else {
                alert('Bạn không có quyền thực hiện thao tác!');
            }
        })
    }
    Role() {
        this.authApiService.getUserRole$().subscribe(res => {
            this.role = res;
            if(this.role == 'B2') this.display = false;
        })
    }
}
