import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofilePageComponent } from './myprofile-page.component';

const routes: Routes = [{ path: '', component: MyprofilePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyprofilePageRoutingModule { }
