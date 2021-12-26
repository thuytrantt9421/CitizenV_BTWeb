import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-charts-pie',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-pie.component.html',
    styleUrls: ['charts-pie.component.scss'],
})
export class ChartsPieComponent implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    @Input() data = {
        nam: '',
        nu: ''
    }
    chart!: Chart;

    constructor() {}
    ngOnInit() {}

    ngAfterViewInit() {
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
    }
}
