import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BeerItemComponent } from './shared/components/beer-item/beer-item.component';
import {CommonModule} from "@angular/common";

import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from "@angular/forms";
import {HoverDirective} from "./shared/directives/hover.directive"; // external pagination module

@NgModule({
  declarations: [
    AppComponent,
    BeerItemComponent,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
