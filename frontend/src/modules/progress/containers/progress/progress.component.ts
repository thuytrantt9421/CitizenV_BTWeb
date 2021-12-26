import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthApiService } from 'api/auth.api.service';
import { ProvinceApiService } from 'api/listProvince.api,service';
import Handsontable from 'handsontable';
import { Province } from 'models/province.model';
import { Subscription } from 'rxjs';
import { ReportApiService } from 'api/report.api.service';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './progress.component.html',
    styleUrls: ['progress.component.scss'],
})
export class ProgressComponent implements OnInit, AfterViewInit, OnDestroy {

    private _subscribe: Subscription[] = [];

    public loadingTable: boolean = false;
    public countRequest: number = 0;

    public filterFormValid!: FormGroup;

    public handsontableInstance: Handsontable = null!;

    public dataSource: Province[] = [];

    public listProvince!: Province[];
    public listQuan!: Province[];
    public listXa!: Province[];
    public listXom!: Province[];
    public tentinh: string = '';
    public tenhuyen: string = '';
    public tenxa: string = '';

    role: string = '';
    displayTinh = true;
    displayHuyen = true;
    displayXa = true;

    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private provinceApiService: ProvinceApiService,
        private authApiService: AuthApiService,
        private reportApiService: ReportApiService
    ) { }

    ngOnInit() {
        this.filterFormValid = this.fb.group({
            tinh: [''],
            huyen: [''],
            xa: ['']
        });
        this.getRole();
    }

    ngAfterViewInit(): void {
        this.refreshView();
    }

    ngOnDestroy(): void {
        this._subscribe.forEach(sb => sb.unsubscribe());
        // this.removeEventTable();
    }

    setLoadingTable(countReq: boolean): void {
        if (countReq) {
            this.countRequest++;
        } else {
            this.countRequest--;
        }
        if (this.countRequest === 0) {
            this.loadingTable = false;
        } else {
            this.loadingTable = true;
        }
        this.refreshView();
    }

    refreshView(): void {
        return this.cdr.detectChanges();
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
                this.initDataSource("", 'id_tinh', 'ten_tinh');
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds!;
                })
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
                this.initDataSource(temp, 'id_huyen', 'ten_huyen');
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listQuan = res.ds!;
                })

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
                this.initDataSource(temp, 'id_xa', 'ten_xa');
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXa = res.ds!;
                })

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
                this.initDataSourceForB1(temp, 'id_xom', 'ten_xom');
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXom = res.ds!;
                })
            }
        })

    }

    createDomByStringHtml(strHtml: string): Node {
        return new DOMParser().parseFromString(strHtml, 'text/html').body.childNodes[0];
    }

    initDataSourceForB1(id: string, id_donvi: string, name: string) {
        const instanceSubcription = this.provinceApiService.getDS(id).subscribe((result) => {
            console.log(result);
            if (result.ds) {
                this.dataSource = result.ds!;
            } else {
                this.dataSource = [];
            }
            this.initTableForB1(this.dataSource, id_donvi, name);
            this.refreshView();
        })
        this._subscribe.push(instanceSubcription);
    }

    initTableForB1(dataTable: Province[], col1: string, col2: string) {
        this.setLoadingTable(true);
        const self = this;

        dataTable.forEach(data => {
            data.trang_thai = this.getStatus(data.trang_thai)!;
        })

        if (this.handsontableInstance && this.handsontableInstance.isDestroyed !== true) {
            this.handsontableInstance.destroy();
        }

        const container = document.getElementById('tableContractId');

        const configTable: Handsontable.GridSettings = {
            licenseKey: "non-commercial-and-evaluation",
            colHeaders: ['Mã đơn vị', 'Tên đơn vị', 'Trạng thái', 'Thao tác'],
            rowHeaders: false,
            width: '100%',
            height: '300px',
            className: 'htCenter htMiddle',
            stretchH: 'all',
            manualColumnResize: true,
            autoRowSize: true,
            // fixedColumnsLeft: 9,
            allowInvalid: true,
            // selectionMode: 'multiple',
            columnSorting: true,
            currentRowClassName: 'currentRow',
            colWidths: [150, 150, 150, 100],
            filter: true,
            // nestedRows: false,
            data: dataTable,
            startCols: 2,
            columns: [
                {
                    data: col1,
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: col2,
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'trang_thai',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'action',
                    readOnly: true,
                    renderer: (instance, td, row, col, prop, value, cellProperties) => {
                        td.className = 'htCenter htMiddle htDimmed';

                        const divWrap: Node = self.createDomByStringHtml(
                            `<div class="d-flex justify-content-center"></div>`
                        );

                        const btnEdit: Node = self.createDomByStringHtml(`<button
                    class="
                        btn btn-icon btn-light btn-sm
                        mr-2
                        mat-focus-indicator mat-icon-button mat-button-base
                        btn-edit-${value}
                    ">
                    <span class="mat-button-wrapper">
                        <span class="material-icons"> edit </span>
                    </span></button>`);

                        btnEdit.addEventListener('click', e => {
                            e.preventDefault();
                            this.reportApiService.Done(this.handsontableInstance.getDataAtCell(row, 0)).subscribe(res => {
                                console.log(res);
                                alert('Báo cáo hoàn thành thành công!')
                                this.ngOnInit();
                            })
                        });

                        divWrap.appendChild(btnEdit);

                        Handsontable.dom.empty(td);
                        td.appendChild(divWrap);
                    }
                }
            ]
        };

        this.handsontableInstance = new Handsontable(container!, configTable);
    }

    initDataSource(id: string, id_donvi: string, name: string) {
        const instanceSubcription = this.provinceApiService.getDS(id).subscribe((result) => {
            console.log(result);
            if (result.ds) {
                this.dataSource = result.ds!;
            } else {
                this.dataSource = [];
            }
            this.initTable(this.dataSource, id_donvi, name);
            this.refreshView();
        })
        this._subscribe.push(instanceSubcription);
    }

    initTable(dataTable: Province[], col1: string, col2: string) {
        this.setLoadingTable(true);
        const self = this;

        dataTable.forEach(data => {
            data.trang_thai = this.getStatus(data.trang_thai)!;
        })

        if (this.handsontableInstance && this.handsontableInstance.isDestroyed !== true) {
            this.handsontableInstance.destroy();
        }

        const container = document.getElementById('tableContractId');

        const configTable: Handsontable.GridSettings = {
            licenseKey: "non-commercial-and-evaluation",
            colHeaders: ['Mã đơn vị', 'Tên đơn vị', 'Trạng thái'],
            rowHeaders: false,
            width: '100%',
            height: '300px',
            className: 'htCenter htMiddle',
            stretchH: 'all',
            manualColumnResize: true,
            autoRowSize: true,
            // fixedColumnsLeft: 9,
            allowInvalid: true,
            // selectionMode: 'multiple',
            columnSorting: true,
            currentRowClassName: 'currentRow',
            colWidths: [150, 150, 150],
            filter: true,
            // nestedRows: false,
            data: dataTable,
            startCols: 2,
            columns: [
                {
                    data: col1,
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: col2,
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'trang_thai',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
            ]
        };

        this.handsontableInstance = new Handsontable(container!, configTable);
    }

    removeEventTable(): void {
        const container = document.getElementById('tableContractId');
        Handsontable.dom.removeEvent(container!, 'click', () => null);
    }

    get controls() {
        return this.filterFormValid.controls;
    }

    filterByTinh() {
        const temp = this.getCookie('token');
        this.listXa = [];
        this.listQuan = [];
        this.controls.huyen.patchValue(null);
        this.controls.xa.patchValue(null);
        if (this.displayTinh) {
            if (this.controls.tinh.value) {
                for (let i = 0; i < this.listProvince.length; i++) {
                    if (this.controls.tinh.value == this.listProvince[i].id_tinh) {
                        this.tentinh = this.listProvince[i].ten_tinh!;
                    }
                }
                this.provinceApiService.getDS(this.controls.tinh.value).subscribe(res => {
                    this.listQuan = res.ds!;
                    if (res.ds) {
                        this.dataSource = res.ds;
                    } else {
                        this.dataSource = [];
                    }
                    this.initTable(this.dataSource, 'id_huyen', 'ten_huyen');
                })
            } else {
                this.tentinh = '';
                this.initDataSource("", 'id_tinh', 'ten_tinh');
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
            this.initDataSource(temp, 'id_huyen', 'ten_huyen');
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listQuan = res.ds!;
            })
        }
    }

    filterByHuyen() {
        const temp = this.getCookie('token');
        this.listXa = [];
        this.controls.xa.patchValue(null);
        if (this.displayHuyen) {
            if (this.controls.huyen.value) {
                for (let i = 0; i < this.listQuan.length; i++) {
                    if (this.controls.huyen.value == this.listQuan[i].id_huyen) {
                        this.tenhuyen = this.listQuan[i].ten_huyen!;
                    }
                }
                this.provinceApiService.getDS(this.controls.huyen.value).subscribe(res => {
                    this.listXa = res.ds!;
                    if (res.ds) {
                        this.dataSource = res.ds;
                    } else {
                        this.dataSource = [];
                    }
                    this.initTable(this.dataSource, 'id_xa', 'ten_xa');
                })
            } else {
                this.tenhuyen = '';
                this.filterByTinh();
            }
        } else {
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listQuan = res.ds!;
                for (let i = 0; i < this.listQuan.length; i++) {
                    if (temp == this.listQuan[i].id_huyen) {
                        this.tenhuyen = this.listQuan[i].ten_huyen!;
                    }
                }
            })
            this.initDataSource(temp, 'id_xa', 'ten_xa');
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listXa = res.ds!;
            })
        }
    }

    filterByXa() {
        const temp = this.getCookie('token');
        if (this.displayXa) {
            if (this.controls.xa.value) {
                for (let i = 0; i < this.listXa.length; i++) {
                    if (this.controls.xa.value == this.listXa[i].id_xa) {
                        this.tenxa = this.listXa[i].ten_xa!;
                    }
                }
                this.provinceApiService.getDS(this.controls.xa.value).subscribe(res => {
                    this.listXom = res.ds!;
                    if (res.ds) {
                        this.dataSource = res.ds;
                    } else {
                        this.dataSource = [];
                    }
                    this.initTable(this.dataSource, 'id_xom', 'ten_xom');
                })
            } else {
                this.tenxa = '';
                this.filterByHuyen();
            }
        }
    }

    getStatus(status: string) {
        if (status === 'CHUAHOANTHANH') return 'Chưa hoàn thành';
        if (status === 'HOANTHANH') return 'Đã hoàn thành';
    }
}
