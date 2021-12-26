/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */

/* Containers */
import * as populationContainers from './containers';

import { SBRouteData } from '@modules/navigation/models';
import { PopulationModule } from './population.module';
/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: populationContainers.PopulationComponent,
        data: {
            title: 'Quản lý dân số',
            breadcrumbs: [
                {
                    text: 'Trang chủ',
                    link: '/dashboard',
                },
                {
                    text: 'Population',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'edit',
        canActivate: [],
        component: populationContainers.EditPersonComponent,
        data: {
            title: 'Quản lý dân số',
            breadcrumbs: [
                {
                    text: 'Trang chủ',
                    link: '/dashboard',
                },
                {
                    text: 'Edit-book',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
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
    imports: [PopulationModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PopulationRoutingModule {}
