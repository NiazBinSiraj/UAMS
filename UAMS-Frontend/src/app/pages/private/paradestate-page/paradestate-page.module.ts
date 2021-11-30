import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParadestatePageRoutingModule } from './paradestate-page-routing.module';
import { ParadestatePageComponent } from './paradestate-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ParadestatePageComponent
  ],
  imports: [
    CommonModule,
    ParadestatePageRoutingModule,
    SharedModule
  ]
})
export class ParadestatePageModule { }
