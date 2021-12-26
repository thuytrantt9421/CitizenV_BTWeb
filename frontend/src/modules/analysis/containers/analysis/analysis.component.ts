import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisApiService } from 'api/analysis.api.service';
import { AuthApiService } from 'api/auth.api.service';
import { ProvinceApiService } from 'api/listProvince.api,service';
import { PopulationApiService } from 'api/population.api.service';
import Chart from 'chart.js';
import { Analysis } from 'models/analysis.model';
import { Province } from 'models/province.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './analysis.component.html',
    styleUrls: ['analysis.component.scss'],
})
export class AnalysisComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    @ViewChild('myPieChart2') myPieChart2!: ElementRef<HTMLCanvasElement>;
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;

    chart!: Chart;
    chart2!: Chart;
    chart3!: Chart;
    private _subscribe: Subscription[] = [];

    public filterFormValid!: FormGroup;

    public listProvince!: Province[];
    public listQuan!: Province[];
    public listXa!: Province[];
    public listXom!: Province[];

    public tentinh: string = '';
    public tenhuyen: string = '';
    public tenxa: string = '';
    public tenxom: string = '';

    role: string = '';
    displayTinh = true;
    displayHuyen = true;
    displayXa = true;
    displayXom = true;

    public data: Analysis = {
        nam: '',
        nu: '',
        thathoc: '',
        thcs: '',
        tieuhoc: '',
        thpt: '',
        cotongiao: '',
        khongtongiao: '',
        duoi18: '',
        tu18den60: '',
        tren60: '',
        message: ''
    };
    public total!: number;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private authApiService: AuthApiService,
        private provinceApiService: ProvinceApiService,
        private populationApiService: PopulationApiService,
        private analysisApiService: AnalysisApiService
    ) { }
    ngAfterViewInit(): void {
    }
    ngOnInit() {
        this.filterFormValid = this.fb.group({
            tinh: [''],
            huyen: [''],
            xa: [''],
            xom: ['']
        });

        this.getRole();
    }

    ngOnDestroy(): void {
        this._subscribe.forEach(sb => sb.unsubscribe());
    }

    refreshView(): void {
        this.cdr.detectChanges();
    }

    private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    getRole() {
        const temp = this.getCookie('token');

        this.authApiService.getUserRole$().subscribe(res => {
            this.role = res;
            if (this.role == 'A1') {
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds!;
                })
                this.getData("");

            } else if (this.role == 'A2') {
                this.displayTinh = false;
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds!;
                    for (let i = 0; i < this.listProvince.length; i++) {
                        if (temp == this.listProvince[i].id_tinh) {
                            this.tentinh = this.listProvince[i].ten_tinh!;
                        }
                    }
                })
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listQuan = res.ds!;
                })
                this.getData(temp);

            } else if (this.role == 'A3') {
                this.displayTinh = false;
                this.displayHuyen = false;
                const roleTam = temp[0] + temp[1];
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds!;
                    for (let i = 0; i < this.listProvince.length; i++) {
                        if (roleTam == this.listProvince[i].id_tinh) {
                            this.tentinh = this.listProvince[i].ten_tinh!;
                        }
                    }
                })
                this.provinceApiService.getDS(roleTam).subscribe(res => {
                    console.log(res.ds);
                    this.listQuan = res.ds!;
                    for (let i = 0; i < this.listQuan.length; i++) {
                        if (temp == this.listQuan[i].id_huyen) {
                            this.tenhuyen = this.listQuan[i].ten_huyen!;
                        }
                    }
                })
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXa = res.ds!;
                })
                this.getData(temp);

            } else if (this.role == 'B1') {
                this.displayTinh = false;
                this.displayHuyen = false;
                this.displayXa = false;
                const roleTam = temp[0] + temp[1];
                const roleTemp = roleTam + temp[2] + temp[3];
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds!;
                    for (let i = 0; i < this.listProvince.length; i++) {
                        if (roleTam == this.listProvince[i].id_tinh) {
                            this.tentinh = this.listProvince[i].ten_tinh!;
                        }
                    }
                })
                this.provinceApiService.getDS(roleTam).subscribe(res => {
                    console.log(res.ds);
                    this.listQuan = res.ds!;
                    for (let i = 0; i < this.listQuan.length; i++) {
                        if (roleTemp == this.listQuan[i].id_huyen) {
                            this.tenhuyen = this.listQuan[i].ten_huyen!;
                        }
                    }
                })
                this.provinceApiService.getDS(roleTemp).subscribe(res => {
                    console.log(res.ds);
                    this.listXa = res.ds!;
                    for (let i = 0; i < this.listXa.length; i++) {
                        if (temp == this.listXa[i].id_xa) {
                            this.tenxa = this.listXa[i].ten_xa!;
                        }
                    }
                })
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXom = res.ds!;
                })
                this.getData(temp);

            }
        })

    }

    getData(id: string) {
        const instanceSubcription = this.analysisApiService.analysis(id).subscribe(res => {
            this.data = res;
            this.total = Number(this.data.nam) + Number(this.data.nu);
            this.chart = new Chart(this.myPieChart.nativeElement, {
                type: 'pie',
                data: {
                    labels: ['Nam', 'Nữ'],
                    datasets: [
                        {
                            data: [Number(this.data.nam), Number(this.data.nu)],
                            backgroundColor: ['#28a745', '#dc3545'],
                        },
                    ],
                },
            });
            this.chart2 = new Chart(this.myPieChart2.nativeElement, {
                type: 'pie',
                data: {
                    labels: ['Dưới 18 tuổi', 'Từ 18 đến 60 tuổi', 'Trên 60 tuổi'],
                    datasets: [
                        {
                            data: [Number(this.data.duoi18), Number(this.data.tu18den60), Number(this.data.tren60)],
                            backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                        },
                    ],
                },
            });

            this.chart3 = new Chart(this.myBarChart.nativeElement, {
                type: 'bar',
                data: {
                    labels: ['Thất học', 'Tiểu học', 'THCS', 'THPT'],
                    datasets: [
                        {
                            label: 'Revenue',
                            backgroundColor: 'rgba(2,117,216,1)',
                            borderColor: 'rgba(2,117,216,1)',
                            data: [Number(this.data.thathoc), Number(this.data.tieuhoc), Number(this.data.thcs), Number(this.data.thpt)],
                        },
                    ],
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                // time: {
                                //     unit: 'number',
                                // },
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    maxTicksLimit: 6,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    min: 0,
                                    max: 10,
                                    maxTicksLimit: 5,
                                },
                                gridLines: {
                                    display: true,
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                },
            });
            this.refreshView();
        })
        this._subscribe.push(instanceSubcription);
    }

    get controls() {
        return this.filterFormValid.controls;
    }

    filterTable() {
    }
    filterByTinh() {
        const temp = this.getCookie('token');
        this.listQuan = [];
        this.listXa = [];
        this.listXom = [];
        this.controls.huyen.patchValue(null);
        this.controls.xa.patchValue(null);
        this.controls.xom.patchValue(null);
        if (this.displayTinh) {
            if (this.controls.tinh.value) {
                for (let i = 0; i < this.listProvince.length; i++) {
                    if (this.controls.tinh.value == this.listProvince[i].id_tinh) {
                        this.tentinh = this.listProvince[i].ten_tinh!;
                    }
                }
                this.provinceApiService.getDS(this.controls.tinh.value).subscribe(res => {
                    this.listQuan = res.ds!;
                })
                this.chart.destroy();
                this.chart2.destroy();
                this.chart3.destroy();
                this.getData(this.controls.tinh.value);
            } else {
                this.chart.destroy();
                this.chart2.destroy();
                this.chart3.destroy();
                this.getData("");
            }
        } else {
            this.provinceApiService.getDS("").subscribe(res => {
                console.log(res.ds);
                this.listProvince = res.ds!;
                for (let i = 0; i < this.listProvince.length; i++) {
                    if (temp == this.listProvince[i].id_tinh) {
                        this.tentinh = this.listProvince[i].ten_tinh!;
                    }
                }
            })
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listQuan = res.ds!;
            })
            this.getData(temp);
        }
    }

    filterByHuyen() {
        const temp = this.getCookie('token');
        this.listXa = [];
        this.listXom = [];
        this.controls.xa.patchValue(null);
        this.controls.xom.patchValue(null);
        if (this.displayHuyen) {
            if (this.controls.huyen.value) {
                for (let i = 0; i < this.listQuan.length; i++) {
                    if (this.controls.huyen.value == this.listQuan[i].id_huyen) {
                        this.tenhuyen = this.listQuan[i].ten_huyen!;
                    }
                }
                this.provinceApiService.getDS(this.controls.huyen.value).subscribe(res => {
                    this.listXa = res.ds!;
                })
                this.chart.destroy();
                this.chart2.destroy();
                this.chart3.destroy();
                this.getData(this.controls.huyen.value);
            } else {
                this.tenhuyen = '';
                this.chart.destroy();
                this.chart2.destroy();
                this.chart3.destroy();
                this.filterByTinh();
            }
        } else {
            const roleTam = this.role[0] + this.role[1];
            this.provinceApiService.getDS("").subscribe(res => {
                console.log(res.ds);
                this.listProvince = res.ds!;
                for (let i = 0; i < this.listProvince.length; i++) {
                    if (roleTam == this.listProvince[i].id_tinh) {
                        this.tentinh = this.listProvince[i].ten_tinh!;
                    }
                }
            })
            this.provinceApiService.getDS(roleTam).subscribe(res => {
                console.log(res.ds);
                this.listQuan = res.ds!;
                for (let i = 0; i < this.listQuan.length; i++) {
                    if (temp == this.listQuan[i].id_huyen) {
                        this.tenhuyen = this.listQuan[i].id_huyen!;
                    }
                }
            })
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listXa = res.ds!;
            })
            this.getData(temp);
        }
    }

    filterByXa() {
        const temp = this.getCookie('token');
        this.listXom = [];
        this.controls.xom.patchValue(null);
        if (this.displayXa) {
            if (this.controls.xa.value) {
                for (let i = 0; i < this.listXa.length; i++) {
                    if (this.controls.xa.value == this.listXa[i].id_xa) {
                        this.tenxa = this.listXa[i].ten_xa!;
                    }
                }
                this.provinceApiService.getDS(this.controls.xa.value).subscribe(res => {
                    this.listXom = res.ds!;
                })
                this.chart.destroy();
                this.chart2.destroy();
                this.chart3.destroy();
                this.getData(this.controls.xa.value);
            } else {
                this.tenxa = '';
                this.chart.destroy();
                this.chart2.destroy();
                this.chart3.destroy();
                this.filterByHuyen();
            }
        } else {
            const roleTam = this.role[0] + this.role[1];
            const roleTemp = roleTam + this.role[2] + this.role[3];
            this.provinceApiService.getDS("").subscribe(res => {
                console.log(res.ds);
                this.listProvince = res.ds!;
                for (let i = 0; i < this.listProvince.length; i++) {
                    if (roleTam == this.listProvince[i].id_tinh) {
                        this.tentinh = this.listProvince[i].ten_tinh!;
                    }
                }
            })
            this.provinceApiService.getDS(roleTam).subscribe(res => {
                console.log(res.ds);
                this.listQuan = res.ds!;
                for (let i = 0; i < this.listQuan.length; i++) {
                    if (roleTemp == this.listQuan[i].id_huyen) {
                        this.tenhuyen = this.listQuan[i].id_huyen!;
                    }
                }
            })
            this.provinceApiService.getDS(roleTemp).subscribe(res => {
                console.log(res.ds);
                this.listXa = res.ds!;
                for (let i = 0; i < this.listXa.length; i++) {
                    if (temp == this.listXa[i].id_xa) {
                        this.tenxa = this.listXa[i].id_xa!;
                    }
                }
            })
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listXom = res.ds!;
            })
            this.getData(temp);
        }
    }

    filterByXom() {
        if (this.controls.xom.value) {
            debugger
            for (let i = 0; i < this.listXom.length; i++) {
                if (this.controls.xom.value == this.listXom[i].id_xom) {
                    this.tenxom = this.listXom[i].ten_xom!;
                }
            }
            this.chart.destroy();
            this.chart2.destroy();
            this.chart3.destroy();
            this.getData(this.controls.xom.value);
        } else {
            this.tenxom = '';
            this.chart.destroy();
            this.chart2.destroy();
            this.chart3.destroy();
            this.filterByXa();
        }
    }
}
