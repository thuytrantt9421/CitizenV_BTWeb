import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { AuthApiService } from 'api/auth.api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavItemsForB2!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];
    @Input() sideNavSectionsForB2!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;
    role: string = '';
    itemDisplay!: SideNavItems;
    sectionDisplay!: SideNavSection[];
    username: string = '';

    constructor(public navigationService: NavigationService, public userService: UserService, private authApiService: AuthApiService) {}

    ngOnInit() {
        this.displayItem();
        this.authApiService.getUserName$().subscribe(res => {
            this.username = res;
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    displayItem() {
        this.authApiService.getUserRole$().subscribe(res => {
            console.log(res);
            this.role = res;
            if(this.role == 'B2') {
                this.itemDisplay = this.sideNavItemsForB2;
                this.sectionDisplay = this.sideNavSectionsForB2;

            } else {
                this.itemDisplay = this.sideNavItems;
                this.sectionDisplay = this.sideNavSections;
            };
        })
    }
}
