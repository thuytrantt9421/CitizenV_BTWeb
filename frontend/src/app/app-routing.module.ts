import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@modules/auth/guards';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/auth/login',
        canActivate: [AuthGuard]
    },
    {
        path: 'app',
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/dashboard/dashboard-routing.module').then(
                        m => m.DashboardRoutingModule
                    ),
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
            },
            {
                path: 'error',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
            },
            {
                path: 'declare',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/declaration/declaration-routing.module').then(m => m.DeclarationRoutingModule),
            },
            {
                path: 'progress',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/progress/progress-routing.module').then(m => m.ProgressRoutingModule),
            },
            {
                path: 'analysis',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/analysis/analysis-routing.module').then(m => m.AnalysisRoutingModule),
            },
            {
                path: 'population',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/population/population-routing.module').then(m => m.PopulationRoutingModule),
            },
            {
                path: 'report',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/reports/report-routing.module').then(m => m.ReportRoutingModule),
            },
            {
                path: 'insert',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/insert/insert-routing.module').then(m => m.InsertRoutingModule),
            },
            {
                path: 'survey',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/survey/survey-routing.module').then(m => m.SurveyRoutingModule),
            },
            {
                path: 'version',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
            },
            {
                path: '**',
                pathMatch: 'full',
                loadChildren: () =>
                    import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
