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

/* Containers */
import * as analysisContainers from './containers';

/* Components */
import * as analysisComponents from './components';

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
    ],
    providers: [DecimalPipe],
    declarations: [
        ...analysisContainers.containers,
        ...analysisComponents.components
    ],
    exports: [...analysisContainers.containers, ...analysisComponents.components],
})
export class AnalysisModule {}
