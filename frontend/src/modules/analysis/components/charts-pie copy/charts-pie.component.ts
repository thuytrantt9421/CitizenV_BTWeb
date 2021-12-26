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
    selector: 'sb-charts-pie-2',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-pie.component.html',
    styleUrls: ['charts-pie.component.scss'],
})
export class ChartsPie2Component implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    @Input() data = {
        duoi18: '',
        tu18den60: '',
        tren60: ''
    }
    chart!: Chart;

    constructor() {}
    ngOnInit() {}

    ngAfterViewInit() {
        this.chart = new Chart(this.myPieChart.nativeElement, {
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
    }
}
