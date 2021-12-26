import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinceApiService } from 'api/listProvince.api,service';
import { PopulationApiService } from 'api/population.api.service';
import { Person } from 'models/person.model';
import { Province } from 'models/province.model';
import { ProvinceResult } from 'models/provinceResult.model';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-person.component.html',
    styleUrls: ['edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {

    public editPersonForm!: FormGroup;
    public listProvince!: Province[];
    public listQuan!: Province[];
    public listXa!: Province[];
    public listXom!: Province[];
    public gender = ['Nam', 'Nữ'];
    public data!: Person;
    public idXom: string = '';
    public dataTemp!: ProvinceResult;

    constructor(
        private fb: FormBuilder,
        private provinceApiService: ProvinceApiService,
        private populationApiService: PopulationApiService
    ) { }

    ngOnInit() {
        this.populationApiService.currentPerson$.subscribe(res => {
            this.data = res;
        })

        this.editPersonForm = this.fb.group({
            cccd: [this.data.cccd, Validators.required],
            name: [this.data.hoten, Validators.required],
            gender: [this.data.gioitinh, Validators.required],
            dob: [this.data.ngaysinh, Validators.required],
            birthplace: [this.data.quequan, Validators.required],
            permanentAddress: [this.data.diachi_thuongtru, Validators.required],
            tempAddress: [this.data.diachi_tamtru, Validators.required],
            region: [this.data.tongiao, Validators.required],
            eduLevel: [this.data.trinhdo, Validators.required],
            profession: [this.data.nghenghiep, Validators.required],
            tinh: [''],
            huyen: [''],
            xa: [''],
            xom: [this.data.id_xom, Validators.required]
        })
        this.provinceApiService.getDS("").subscribe(res => {
            console.log(res.ds);
            this.listProvince = res.ds!;
        })
    }

    initForm() {
        const controls = this.editPersonForm.controls;

        if (controls.tinh.value) {
            this.provinceApiService.getDS(controls.tinh.value).subscribe(res => {
                this.listQuan = res.ds!;
            })
        }
        if (controls.huyen.value) {
            this.provinceApiService.getDS(controls.huyen.value).subscribe(res => {
                this.listXa = res.ds!;
            })
        }
        if (controls.xa.value) {
            this.provinceApiService.getDS(controls.xa.value).subscribe(res => {
                this.listXom = res.ds!;
            })
        }
    }
    get controls() {
        return this.editPersonForm.controls;
    }

    editPerson() {
        console.log(this.controls);
        if (this.editPersonForm.invalid) {
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
        this.populationApiService.editPerson(this.data).subscribe(res => {
            console.log(res);
            if(res.message === 'success') {
                alert('Cập nhật thành công!');
            }
        })
    }
}
