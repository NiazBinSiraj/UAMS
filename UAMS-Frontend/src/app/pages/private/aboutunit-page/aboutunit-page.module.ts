import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutunitPageRoutingModule } from './aboutunit-page-routing.module';
import { AboutunitPageComponent } from './aboutunit-page.component';


@NgModule({
  declarations: [
    AboutunitPageComponent
  ],
  imports: [
    CommonModule,
    AboutunitPageRoutingModule
  ]
})
export class AboutunitPageModule { }
