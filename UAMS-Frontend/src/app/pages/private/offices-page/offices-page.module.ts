import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesPageRoutingModule } from './offices-page-routing.module';
import { OfficesPageComponent } from './offices-page.component';


@NgModule({
  declarations: [
    OfficesPageComponent
  ],
  imports: [
    CommonModule,
    OfficesPageRoutingModule
  ]
})
export class OfficesPageModule { }
