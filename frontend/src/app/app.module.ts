import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AuthGuard } from '@modules/auth/guards';
import { authStrategyProvider } from '@modules/auth/components/auth.strategy';
import { ForRolesDirective } from './for-roles.directive';

// register Handsontable's modules
registerAllModules();

@NgModule({
    declarations: [AppComponent, ForRolesDirective],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatInputModule, MatFormFieldModule, MatButtonModule, HotTableModule, NgxMatSelectSearchModule],
    providers: [AuthGuard, authStrategyProvider],
    bootstrap: [AppComponent],
})
export class AppModule { }
