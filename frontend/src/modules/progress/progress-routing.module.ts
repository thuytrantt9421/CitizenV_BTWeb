/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */

/* Containers */
import * as progressContainers from './containers';

import { SBRouteData } from '@modules/navigation/models';
import { ProgressModule } from './progress.module';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: progressContainers.ProgressComponent,
        data: {
            title: 'Theo dõi tiến độ',
            breadcrumbs: [
                {
                    text: 'Trang chủ',
                    link: '/dashboard',
                },
                {
                    text: 'Progress',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    // {
    //     path: 'edit',
    //     canActivate: [],
    //     component: booksContainers.EditBookComponent,
    //     data: {
    //         title: 'Chỉnh sửa thông tin sách',
    //         breadcrumbs: [
    //             {
    //                 text: 'Trang chủ',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Edit-book',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    // },
    // {
    //     path: 'add',
    //     canActivate: [],
    //     component: booksContainers.AddBookComponent,
    //     data: {
    //         title: 'Thêm mới sách',
    //         breadcrumbs: [
    //             {
    //                 text: 'Trang chủ',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Add-book',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    // },
];

@NgModule({
    imports: [ProgressModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ProgressRoutingModule {}
