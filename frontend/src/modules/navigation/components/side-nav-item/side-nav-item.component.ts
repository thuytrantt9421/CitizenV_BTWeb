import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';
import { AuthApiService } from 'api/auth.api.service';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;
    // @Input() link!: string;

    expanded = false;
    routeData!: SBRouteData;
    role: string = '';
    itemDisplay!: SideNavItem;

    constructor(private router: Router, private authApiService: AuthApiService) {}
    ngOnInit() {
        // this.displayItem();
    }
    turnLink() {
        this.expanded = !this.expanded;
        this.router.navigate([this.sideNavItem.link]);
    }

    // displayItem() {
    //     this.authApiService.getUserRole$().subscribe(res => {
    //         console.log(res);
    //         this.role = res;
    //         if(this.role == 'B2') this.itemDisplay = this.sideNavItemForB2;
    //         else this.itemDisplay = this.sideNavItem;
    //     })
    // }
}
