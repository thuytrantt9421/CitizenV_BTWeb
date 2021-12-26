import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './report.component.html',
    styleUrls: ['report.component.scss'],
})
export class ReportComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
