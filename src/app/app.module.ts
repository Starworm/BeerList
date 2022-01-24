import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BeerItemComponent } from './shared/components/beer-item/beer-item.component';
import {CommonModule} from "@angular/common";

import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from "@angular/forms";
import {HoverDirective} from "./shared/directives/hover.directive";
import { HomeComponent } from './shared/components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeGuard} from "./home.guard";
import { EnterComponent } from './shared/components/enter/enter.component';
import { EnterFailComponent } from './shared/components/enter-fail/enter-fail.component'; // external pagination module

/** routes for application */
const appRoutes: Routes = [
  {path: '', component: EnterComponent},
  {path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'fail', component: EnterFailComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    BeerItemComponent,
    HoverDirective,
    HomeComponent,
    EnterComponent,
    EnterFailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
