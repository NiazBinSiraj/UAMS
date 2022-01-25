import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YearRoutingModule } from './year-routing.module';
import { YearComponent } from './year.component';


@NgModule({
  declarations: [
    YearComponent
  ],
  imports: [
    CommonModule,
    YearRoutingModule,
    SharedModule
  ]
})
export class YearModule { }
