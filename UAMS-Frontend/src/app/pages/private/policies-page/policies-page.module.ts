import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesPageRoutingModule } from './policies-page-routing.module';
import { PoliciesPageComponent } from './policies-page.component';


@NgModule({
  declarations: [
    PoliciesPageComponent
  ],
  imports: [
    CommonModule,
    PoliciesPageRoutingModule
  ]
})
export class PoliciesPageModule { }
