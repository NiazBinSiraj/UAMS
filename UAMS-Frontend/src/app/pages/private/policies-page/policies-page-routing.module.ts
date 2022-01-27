import { PoliciesPageComponent } from './policies-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: PoliciesPageComponent }, { path: 'work-category/:category', loadChildren: () => import('./year/year.module').then(m => m.YearModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesPageRoutingModule { }
