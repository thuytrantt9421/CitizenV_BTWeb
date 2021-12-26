/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */

/* Containers */
import * as declrationContainers from './containers';

import { SBRouteData } from '@modules/navigation/models';
import { DeclarationModule } from './declaration.module';
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: declrationContainers.DeclareComponent,
        data: {
            title: 'Khai báo / Cấp quyền',
            breadcrumbs: [
                {
                    text: 'Trang chủ',
                    link: '/dashboard',
                },
                {
                    text: 'Declare',
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
    imports: [DeclarationModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DeclarationRoutingModule {}
