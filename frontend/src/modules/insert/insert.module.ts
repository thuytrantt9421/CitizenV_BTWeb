/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

/* Containers */
import * as insertContainers from './containers';
import { ForRolesDirective } from './for-roles.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [DecimalPipe, ForRolesDirective],
    declarations: [
        ...insertContainers.containers,
        ForRolesDirective,
    ],
    exports: [...insertContainers.containers],
})
export class InsertModule {}
