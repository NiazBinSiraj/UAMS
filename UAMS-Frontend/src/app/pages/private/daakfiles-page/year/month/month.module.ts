import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonthComponent
  ],
  imports: [
    CommonModule,
    MonthRoutingModule,
    SharedModule
  ]
})
export class MonthModule { }
