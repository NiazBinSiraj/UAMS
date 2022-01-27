import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesPageRoutingModule } from './policies-page-routing.module';
import { PoliciesPageComponent } from './policies-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PoliciesPageComponent
  ],
  imports: [
    CommonModule,
    PoliciesPageRoutingModule,
    SharedModule
  ]
})
export class PoliciesPageModule { }
