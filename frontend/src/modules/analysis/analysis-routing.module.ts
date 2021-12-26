/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */

/* Containers */
import * as analysisContainers from './containers';

import { SBRouteData } from '@modules/navigation/models';
import { AnalysisModule } from './analysis.module';
/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: analysisContainers.AnalysisComponent,
        data: {
            title: 'Phân tích số liệu',
            breadcrumbs: [
                {
                    text: 'Trang chủ',
                    link: '/dashboard',
                },
                {
                    text: 'Analysis',
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
    imports: [AnalysisModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AnalysisRoutingModule {}
