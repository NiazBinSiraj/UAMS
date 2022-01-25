import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesPageRoutingModule } from './offices-page-routing.module';
import { OfficesPageComponent } from './offices-page.component';
import { WorkCategoryModule } from './work-category/work-category.module';


@NgModule({
  declarations: [
    OfficesPageComponent
  ],
  imports: [
    CommonModule,
    OfficesPageRoutingModule,
    WorkCategoryModule
  ]
})
export class OfficesPageModule { }
