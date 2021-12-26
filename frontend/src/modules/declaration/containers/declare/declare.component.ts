import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeclareDialogComponent } from '@modules/declaration/components';
import Handsontable from 'handsontable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Province } from 'models/province.model';
import { ProvinceApiService } from 'api/listProvince.api,service';
import { AccountApiService } from 'api/account.api.service';
import { User } from 'models/user.model';
import { AuthApiService } from 'api/auth.api.service';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './declare.component.html',
    styleUrls: ['declare.component.scss'],
})
export class DeclareComponent implements OnInit, AfterViewInit, OnDestroy {

    private _subscribe: Subscription[] = [];

    public loadingTable: boolean = false;
    public countRequest: number = 0;

    public filterFormValid!: FormGroup;

    public handsontableInstance: Handsontable = null!;

    public listProvince!: Province[];
    public listQuan!: Province[];
    public listXa!: Province[];
    public listXom!: Province[];
    public tentinh: string = '';
    public tenhuyen: string = '';
    public tenxa: string = '';

    public dataSource: User[] = [];
    public dataDonvi: string = '';
    role: string = '';
    displayTinh = true;
    displayHuyen = true;
    displayXa = true;

    constructor(
        public dialog: MatDialog,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private provinceApiService: ProvinceApiService,
        private accountApiService: AccountApiService,
        private authApiService: AuthApiService
    ) { }

    ngOnInit() {
        this.filterFormValid = this.fb.group({
            tinh: [''],
            huyen: [''],
            xa: ['']
        });
        this.getRole();
        // this.provinceApiService.getDS("").subscribe(res => {
        //     console.log(res.ds);
        //     this.listProvince = res.ds;
        //     this.provinceApiService.dsTinh$.next(this.listProvince);
        //     this.refreshView();
        // })
        // this.initDataSource("");
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

    createDomByStringHtml(strHtml: string): Node {
        return new DOMParser().parseFromString(strHtml, 'text/html').body.childNodes[0];
    }

    getRole() {
        const temp = this.getCookie('token');
        this.authApiService.getUserRole$().subscribe(res => {
            this.role = res;
            if (this.role == 'A1') {
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds;
                    this.provinceApiService.dsTinh$.next(this.listProvince);
                    this.refreshView();
                })
                this.initDataSource("");
            }
            else if (this.role == 'A3') {
                this.displayTinh = false;
                this.displayHuyen = false;
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXa = res.ds;
                    this.provinceApiService.dsXa$.next(this.listXa);
                    this.refreshView();
                })
                this.initDataSource(temp);
            }
            else if (this.role == 'B1') {
                this.displayTinh = false;
                this.displayHuyen = false;
                this.displayXa = false;
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXom = res.ds;
                    this.provinceApiService.dsXom$.next(this.listXom);
                    this.refreshView();
                })
                this.initDataSource(temp);
            }
            else if (this.role == 'A2') {
                this.displayTinh = false;
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listQuan = res.ds;
                    this.provinceApiService.dsHuyen$.next(this.listQuan);
                    this.refreshView();
                })
                this.initDataSource(temp);
            }
        })
    }

    initDataSource(user_name: string) {
        const instanceSubcription = this.accountApiService.getInfoAccount(user_name).subscribe(res => {
            if (res.ds_nguoidung) {
                this.dataSource = res.ds_nguoidung;
                for (let i = 0; i < this.dataSource.length; i++) {
                    this.dataSource[i].quyen = this.getTenQuyen(this.dataSource[i].quyen!);
                }
                let tinhTam: Province[] = [];
                let huyenTam: Province[] = [];
                let xaTam: Province[] = [];
                let xomTam: Province[] = [];

                if (this.provinceApiService.dsTinh$.value) {
                    this.provinceApiService.dsTinh$.subscribe(result => {
                        tinhTam = result;
                    })
                }

                if (this.provinceApiService.dsHuyen$.value) {
                    this.provinceApiService.dsHuyen$.subscribe(result => {
                        huyenTam = result;
                    })
                }

                if (this.provinceApiService.dsXa$.value) {
                    this.provinceApiService.dsXa$.subscribe(result => {
                        xaTam = result;
                    })
                }

                if (this.provinceApiService.dsXom$.value) {
                    this.provinceApiService.dsXom$.subscribe(result => {
                        xomTam = result;
                    })
                }

                for (let m = 0; m < this.dataSource.length; m++) {
                    if (tinhTam.length) {
                        for (let i = 0; i < tinhTam.length; i++) {
                            if (this.dataSource[m].tai_khoan === tinhTam[i].id_tinh) {
                                this.dataSource[m].donvi = tinhTam[i].ten_tinh;
                            }
                        }
                    }

                    if (huyenTam.length) {
                        for (let i = 0; i < huyenTam.length; i++) {
                            if (this.dataSource[m].tai_khoan === huyenTam[i].id_huyen) {
                                this.dataSource[m].donvi = huyenTam[i].ten_huyen;
                            }
                        }
                    }
                    if (xaTam.length) {
                        for (let i = 0; i < xaTam.length; i++) {
                            if (this.dataSource[m].tai_khoan === xaTam[i].id_xa) {
                                this.dataSource[m].donvi = xaTam[i].ten_xa;
                            }
                        }
                    }
                    if (xomTam.length) {
                        for (let i = 0; i < xomTam.length; i++) {
                            if (this.dataSource[m].tai_khoan === xomTam[i].id_xom) {
                                this.dataSource[m].donvi = xomTam[i].ten_xom;
                            }
                        }
                    }
                }
            } else {
                this.dataSource = [];
            }
            this.initTable(this.dataSource);
        })

        this._subscribe.push(instanceSubcription);

    }

    initTable(dataTable: User[]) {
        const self = this;

        if (this.handsontableInstance && this.handsontableInstance.isDestroyed !== true) {
            this.handsontableInstance.destroy();
        }

        const container = document.getElementById('tableContractId');

        const configTable: Handsontable.GridSettings = {
            licenseKey: "non-commercial-and-evaluation",
            colHeaders: ['Đơn vị', 'Mã đơn vị', 'Mật khẩu', 'Họ tên', 'Số điện thoại', 'Email', 'Địa chỉ', 'Quyền', 'Chỉnh sửa'],
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
            colWidths: [150, 150, 150, 150, 150, 150, 200, 150, 150, 100],
            filter: true,
            // nestedRows: false,
            data: dataTable,
            startCols: 2,
            columns: [
                // {
                //     data: 'permission',
                //     readOnly: true,
                //     filter: false,
                //     renderer: (instance, td, row, col, prop, value, cellProperties) => {
                //         td.className = 'htCenter htMiddle htDimmed';
                //         const checkbox = document.createElement('input');
                //         checkbox.type = 'checkbox';

                //         if (value) {
                //             checkbox.checked = true;
                //         }
                //         let tk: string;
                //         let permisson: string;

                //         checkbox.addEventListener('change', e => {
                //             e.preventDefault();
                //             tk = this.handsontableInstance.getDataAtCell(row, 2);
                //             permisson = this.handsontableInstance.getDataAtCell(row, 8);
                //             // self.handsontableInstance.setDataAtCell(row, 0, !value);
                //             if (permisson === 'Có') {
                //                 this.accountApiService.editPermisson(tk, 'NO').subscribe(res => {
                //                     console.log(res);
                //                     alert('Chỉnh sửa quyền thành công!');
                //                     this.refreshView();
                //                     this.ngOnInit();
                //                 })
                //             } else {
                //                 this.accountApiService.editPermisson(tk, 'YES').subscribe(res => {
                //                     console.log(res);
                //                     alert('Chỉnh sửa quyền thành công!');
                //                     this.refreshView();
                //                     this.ngOnInit();
                //                 })
                //             }
                //         });

                //         Handsontable.dom.empty(td);
                //         td.appendChild(checkbox);
                //     }
                // },
                {
                    data: 'donvi',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'tai_khoan',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'mat_khau',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'ho_ten',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'sdt',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'email',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'dia_chi',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'quyen',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'edit',
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
                            const tk = this.handsontableInstance.getDataAtCell(row, 1);
                            const permisson = this.handsontableInstance.getDataAtCell(row, 7);
                            if (permisson === 'Có') {
                                this.accountApiService.editPermisson(tk, 'NO').subscribe(res => {
                                    console.log(res);
                                    alert('Chỉnh sửa quyền thành công!');
                                    this.refreshView();
                                    this.ngOnInit();
                                })
                            } else {
                                this.accountApiService.editPermisson(tk, 'YES').subscribe(res => {
                                    console.log(res);
                                    alert('Chỉnh sửa quyền thành công!');
                                    this.refreshView();
                                    this.ngOnInit();
                                })
                            }
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

    timDonvi(data: User) {
        for (let i = 0; i < this.listProvince.length; i++) {
            if (data.tai_khoan === this.listProvince[i].id_tinh) {
                data.donvi = this.listProvince[i].ten_tinh;
            }
            if (this.listQuan.length) {
                if (data.tai_khoan === this.listQuan[i].id_huyen) {
                    data.donvi = this.listQuan[i].ten_huyen;
                }
            }
            if (this.listXa.length) {
                if (data.tai_khoan === this.listXa[i].id_xa) {
                    data.donvi = this.listXa[i].ten_xa;
                }
            }
            if (this.listXom.length) {
                if (data.tai_khoan === this.listXom[i].id_xom) {
                    data.donvi = this.listXom[i].ten_xom;
                }
            }
        }
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
                    this.provinceApiService.dsHuyen$.next(this.listQuan);
                    this.initDataSource(this.controls.tinh.value);
                })
            } else {
                this.initDataSource("");
            }
        } else {
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listQuan = res.ds;
                this.provinceApiService.dsHuyen$.next(this.listQuan);
                this.refreshView();
            })
            this.initDataSource(temp);
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
                    this.listXa = res.ds;
                    this.provinceApiService.dsXa$.next(this.listXa);
                    this.initDataSource(this.controls.huyen.value);
                })
            } else {
                this.filterByTinh();
            }
        } else {
            this.provinceApiService.getDS(temp).subscribe(res => {
                console.log(res.ds);
                this.listXa = res.ds;
                this.provinceApiService.dsXa$.next(this.listXa);
                this.refreshView();
            })
        }
    }

    filterByXa() {
        const temp = this.getCookie('token');
        if (this.controls.xa.value) {
            for (let i = 0; i < this.listXa.length; i++) {
                if (this.controls.xa.value == this.listXa[i].id_xa) {
                    this.tenxa = this.listXa[i].ten_xa!;
                }
            }
            this.provinceApiService.getDS(this.controls.xa.value).subscribe(res => {
                this.listXom = res.ds;
                this.provinceApiService.dsXom$.next(this.listXom);
                this.initDataSource(this.controls.xa.value);
            })
        } else {
            this.filterByHuyen();
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(DeclareDialogComponent, {
            width: '60%',
            data: null,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    getTenQuyen(quyen: string) {
        if (quyen === 'NO') return 'Không';
        if (quyen === 'YES') return 'Có';
    }
}
