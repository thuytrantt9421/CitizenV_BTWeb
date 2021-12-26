import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'api/auth.api.service';

@Component({
    selector: 'sb-books',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './population.component.html',
    styleUrls: ['population.component.scss'],
})
export class PopulationComponent implements OnInit {
    constructor(private router: Router, private authApiService: AuthApiService) {}
    ngOnInit() {}

    addPerson() {
        this.authApiService.getUserPermisson$().subscribe(res => {
            if(res == 'Có') {
                this.router.navigate(['app/insert']);
            } else {
                alert('Bạn không có quyền thực hiện thao tác!');
            }
        })
    }
}
