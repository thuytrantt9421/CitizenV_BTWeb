import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { Person } from 'models/person.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Province } from 'models/province.model';
import { Router } from '@angular/router';
import { ProvinceApiService } from 'api/listProvince.api,service';
import { PopulationApiService } from 'api/population.api.service';
import { AuthApiService } from 'api/auth.api.service';

@Component({
    selector: 'population-content',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './population-content.component.html',
    styleUrls: ['population-content.component.scss'],
})
export class PopulationContentComponent implements OnInit, AfterViewInit {

    private _subscribe: Subscription[] = [];

    // init filter form
    public filterFormValid!: FormGroup;

    // icon loading page
    public loadingTable: boolean = false;
    public countRequest: number = 0;

    public handsontableInstance: Handsontable = null!;

    public dataSource: Person[] = [];

    public listProvince!: Province[];
    public listQuan!: Province[];
    public listXa!: Province[];
    public listXom!: Province[];

    public currentData!: Person;

    role: string = '';
    displayTinh = true;
    displayHuyen = true;
    displayXa = true;
    displayXom = true;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private provinceApiService: ProvinceApiService,
        private authApiService: AuthApiService,
        private populationApiService: PopulationApiService
    ) { }
    ngOnInit() {
        this.initFilterForm();
        this.getRole();
    }

    ngAfterViewInit(): void {
        this.refreshView();
    }

    ngOnDestroy(): void {
        this._subscribe.forEach(sb => sb.unsubscribe());
        // this.removeEventTable();
    }

    refreshView(): void {
        return this.cdr.detectChanges();
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

    createDomByStringHtml(strHtml: string): Node {
        return new DOMParser().parseFromString(strHtml, 'text/html').body.childNodes[0];
    }

    deleteItemContract(cccd: string) {
        this.populationApiService.deletePerson(cccd).subscribe(res => {
            console.log(res);
            if (res.message === 'success') {
                alert('Xoá thành công!');
                this.refreshView();
                this.initDataSource("");
            }
        })
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
                this.initDataSource("");
                this.provinceApiService.getDS("").subscribe(res => {
                    console.log(res.ds);
                    this.listProvince = res.ds!;
                })

            } else if (this.role == 'A2') {
                this.displayTinh = false;
                this.initDataSource(temp);
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listQuan = res.ds;
                })

            } else if (this.role == 'A3') {
                this.displayTinh = false;
                this.displayHuyen = false;
                this.initDataSource(temp);
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXa = res.ds;
                })

            } else if (this.role == 'B1') {
                this.displayTinh = false;
                this.displayHuyen = false;
                this.displayXa = false;
                this.initDataSource(temp);
                this.provinceApiService.getDS(temp).subscribe(res => {
                    console.log(res.ds);
                    this.listXom = res.ds;
                })

            }
        })
    }

    initFilterForm() {
        this.filterFormValid = this.fb.group({
            tinh: [''],
            huyen: [''],
            xa: [''],
            xom: [''],
            name: [''],
            cccd: ['']
        });
    }

    initDataSource(id: string) {
        const instanceSubcription = this.populationApiService.getDS(id).subscribe((result) => {
            console.log(result)
            if(result.ds_nguoidan) {
                this.dataSource = result.ds_nguoidan!
            } else {
                this.dataSource = [];
            }
            this.initTable(this.dataSource);

            this.refreshView();
        })
        this._subscribe.push(instanceSubcription);
    }

    initTable(dataTable: Person[] | undefined) {
        this.setLoadingTable(true);
        const self = this;

        if (this.handsontableInstance && this.handsontableInstance.isDestroyed !== true) {
            this.handsontableInstance.destroy();
        }

        const container = document.getElementById('tableContractId');

        const configTable: Handsontable.GridSettings = {
            licenseKey: "non-commercial-and-evaluation",
            colHeaders: ['CCCD/CMND', 'Họ tên', 'Giới tính', 'Ngày sinh', 'Quê quán', 'Địa chỉ thường trú', 'Địa chỉ tạm trú', 'Tôn giáo', 'Trình độ văn hóa', 'Nghề nghiệp', 'Mã xóm', 'Thao tác'],
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
            colWidths: [100, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
            filter: true,
            // nestedRows: false,
            data: dataTable,
            startCols: 2,
            columns: [
                {
                    data: 'cccd',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'hoten',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'gioitinh',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'ngaysinh',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'quequan',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'diachi_thuongtru',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'diachi_tamtru',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'tongiao',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'trinhdo',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'nghenghiep',
                    readOnly: true,
                    className: 'htCenter htMiddle'
                },
                {
                    data: 'id_xom',
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
                        const btnDel: Node = self.createDomByStringHtml(`<button
                    class="
                        btn btn-icon btn-light btn-sm
                        mat-focus-indicator mat-icon-button mat-button-base
                        btn-delete-${value}
                    ">
                    <span class="mat-button-wrapper">
                        <span class="material-icons"> delete </span>
                    </span></button>`);
                        btnEdit.addEventListener('click', e => {
                            e.preventDefault();
                            this.authApiService.getUserPermisson$().subscribe(res => {
                                if(res == 'Có') {
                                    this.currentData = {
                                        cccd: this.handsontableInstance.getDataAtCell(row, 0),
                                        hoten: this.handsontableInstance.getDataAtCell(row, 1),
                                        gioitinh: this.handsontableInstance.getDataAtCell(row, 2),
                                        ngaysinh: this.handsontableInstance.getDataAtCell(row, 3),
                                        quequan: this.handsontableInstance.getDataAtCell(row, 4),
                                        diachi_thuongtru: this.handsontableInstance.getDataAtCell(row, 5),
                                        diachi_tamtru: this.handsontableInstance.getDataAtCell(row, 6),
                                        tongiao: this.handsontableInstance.getDataAtCell(row, 7),
                                        trinhdo: this.handsontableInstance.getDataAtCell(row, 8),
                                        nghenghiep: this.handsontableInstance.getDataAtCell(row, 9),
                                        id_xom: this.handsontableInstance.getDataAtCell(row, 10)
                                    };
                                    this.populationApiService.currentPerson$.next(this.currentData);
                                    self.router.navigate(['app/population/edit']);
                                } else {
                                    alert('Bạn không có quyền thực hiện thao tác!');
                                }
                            })
                        });

                        btnDel.addEventListener('click', e => {
                            e.preventDefault();
                            const id = self.handsontableInstance.getDataAtCell(row, 0)
                            this.authApiService.getUserPermisson$().subscribe(res => {
                                if(res == 'Có') {
                                    self.deleteItemContract(id);
                                } else {
                                    alert('Bạn không có quyền thực hiện thao tác!');
                                }
                            })
                        });

                        divWrap.appendChild(btnEdit);
                        divWrap.appendChild(btnDel);

                        Handsontable.dom.empty(td);
                        td.appendChild(divWrap);
                    }
                }
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

    filterTable() {
        let ten = '';
        let cccd = '';
        this.controls.cccd.value ? cccd = this.controls.cccd.value : cccd = "";
        this.controls.name.value ? ten = this.controls.name.value : ten = "";

        if (this.controls.xom.value) {
            this.populationApiService.getDS(this.controls.xom.value, ten, cccd).subscribe(res => {
                if (res.ds_nguoidan) {
                    this.dataSource = res.ds_nguoidan!;
                } else {
                    this.dataSource = [];
                }
                this.handsontableInstance.destroy();
                this.initTable(this.dataSource);
                this.refreshView();
            })
        } else {
            if (this.controls.xa.value) {
                this.populationApiService.getDS(this.controls.xa.value, ten, cccd).subscribe((result) => {
                    if (result.ds_nguoidan) {
                        this.dataSource = result.ds_nguoidan!;
                    } else {
                        this.dataSource = [];
                    }
                    this.initTable(this.dataSource);

                    this.refreshView();
                });
            } else {
                if (this.controls.huyen.value) {
                    this.populationApiService.getDS(this.controls.huyen.value, ten, cccd).subscribe((result) => {
                        if (result.ds_nguoidan) {
                            this.dataSource = result.ds_nguoidan!;
                        } else {
                            this.dataSource = [];
                        }
                        this.initTable(this.dataSource);

                        this.refreshView();
                    });
                } else {
                    if (this.controls.tinh.value) {
                        this.populationApiService.getDS(this.controls.tinh.value, ten, cccd).subscribe((result) => {
                            if (result.ds_nguoidan) {
                                this.dataSource = result.ds_nguoidan!;
                            } else {
                                this.dataSource = [];
                            }
                            this.initTable(this.dataSource);

                            this.refreshView();
                        });
                    } else {
                        this.populationApiService.getDS("", ten, cccd).subscribe((result) => {
                            console.log(result)
                            if (result.ds_nguoidan) {
                                this.dataSource = result.ds_nguoidan!;
                            } else {
                                this.dataSource = [];
                            }
                            this.initTable(this.dataSource);

                            this.refreshView();
                        })
                    }
                }
            }
        }
    }

    filterByTinh() {
        this.listQuan = [];
        this.listXa = [];
        this.listXom = [];
        this.controls.huyen.patchValue(null);
        this.controls.xa.patchValue(null);
        this.controls.xom.patchValue(null);

        let ten = '';
        let cccd = '';
        this.controls.cccd.value ? cccd = this.controls.cccd.value : cccd = "";
        this.controls.name.value ? ten = this.controls.name.value : ten = "";

        if (this.controls.tinh.value) {
            this.provinceApiService.getDS(this.controls.tinh.value).subscribe(res => {
                this.listQuan = res.ds!;
            })
            this.populationApiService.getDS(this.controls.tinh.value, ten, cccd).subscribe(res => {
                if (res.ds_nguoidan) {
                    this.dataSource = res.ds_nguoidan!;
                } else {
                    this.dataSource = [];
                }
                this.handsontableInstance.destroy();
                this.initTable(this.dataSource);
                this.refreshView();
            })
        } else {
            this.populationApiService.getDS("", ten, cccd).subscribe(res => {
                if (res.ds_nguoidan) {
                    this.dataSource = res.ds_nguoidan!;
                } else {
                    this.dataSource = [];
                }
                this.handsontableInstance.destroy();
                this.initTable(this.dataSource);
                this.refreshView();
            })
        }
    }

    filterByHuyen() {
        this.listXa = [];
        this.listXom = [];
        this.controls.xa.patchValue(null);
        this.controls.xom.patchValue(null);

        let ten = '';
        let cccd = '';
        this.controls.cccd.value ? cccd = this.controls.cccd.value : cccd = "";
        this.controls.name.value ? ten = this.controls.name.value : ten = "";

        if (this.controls.huyen.value) {
            this.provinceApiService.getDS(this.controls.huyen.value).subscribe(res => {
                this.listXa = res.ds!;
            })
            this.populationApiService.getDS(this.controls.huyen.value, ten, cccd).subscribe(res => {
                if (res.ds_nguoidan) {
                    this.dataSource = res.ds_nguoidan!;
                } else {
                    this.dataSource = [];
                }
                this.handsontableInstance.destroy();
                this.initTable(this.dataSource);
                this.refreshView();
            })
        } else {
            this.populationApiService.getDS(this.controls.tinh.value, ten, cccd).subscribe((result) => {
                console.log(result)
                this.dataSource = result.ds_nguoidan!;
                this.initTable(this.dataSource);

                this.refreshView();
            });
        }
    }

    filterByXa() {
        this.listXom = [];
        this.controls.xom.patchValue(null);

        let ten = '';
        let cccd = '';
        this.controls.cccd.value ? cccd = this.controls.cccd.value : cccd = "";
        this.controls.name.value ? ten = this.controls.name.value : ten = "";

        if (this.controls.xa.value) {
            this.provinceApiService.getDS(this.controls.xa.value).subscribe(res => {
                this.listXom = res.ds!;
            })
            this.populationApiService.getDS(this.controls.xa.value, ten, cccd).subscribe(res => {
                if (res.ds_nguoidan) {
                    this.dataSource = res.ds_nguoidan!;
                } else {
                    this.dataSource = [];
                }
                this.handsontableInstance.destroy();
                this.initTable(this.dataSource);
                this.refreshView();
            })
        } else {
            this.populationApiService.getDS(this.controls.huyen.value, ten, cccd).subscribe((result) => {
                console.log(result)
                this.dataSource = result.ds_nguoidan!;
                this.initTable(this.dataSource);

                this.refreshView();
            });
        }
    }

    filterByXom() {
        let ten = '';
        let cccd = '';
        this.controls.cccd.value ? cccd = this.controls.cccd.value : cccd = "";
        this.controls.name.value ? ten = this.controls.name.value : ten = "";

        if (this.controls.xom.value) {
            this.populationApiService.getDS(this.controls.xom.value, ten, cccd).subscribe(res => {
                if (res.ds_nguoidan) {
                    this.dataSource = res.ds_nguoidan!;
                } else {
                    this.dataSource = [];
                }
                this.handsontableInstance.destroy();
                this.initTable(this.dataSource);
                this.refreshView();
            })
        } else {
            this.populationApiService.getDS(this.controls.xa.value, ten, cccd).subscribe((result) => {
                console.log(result)
                this.dataSource = result.ds_nguoidan!;
                this.initTable(this.dataSource);

                this.refreshView();
            });
        }
    }

    checkPermisson(): boolean {
        this.authApiService.getUserPermisson$().subscribe(res => {
            if(res == 'Có') return true;
            else return false;
        })
        return false;
    }
}
