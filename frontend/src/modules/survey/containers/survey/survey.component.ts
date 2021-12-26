import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './survey.component.html',
    styleUrls: ['survey.component.scss'],
})
export class SurveyComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
    display: boolean = true;
    print() {
        this.display = false;
        window.print();
    }
}
