import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { AppComponent } from './app.component';
import { MultiCheckFilterComponent } from './multicheck-filter.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent, MultiCheckFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    InputsModule,
    LabelModule
  ]
})
export class AppModule { }
