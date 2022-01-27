import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkCategoryRoutingModule } from './work-category-routing.module';
import { WorkCategoryComponent } from './work-category.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
  
    WorkCategoryComponent
  ],
  imports: [
    CommonModule,
    WorkCategoryRoutingModule,
    SharedModule
  ]
})
export class WorkCategoryModule { }
