import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearComponent } from './year.component';

const routes: Routes = [{ path: '', component: YearComponent }, { path: 'year/:year', loadChildren: () => import('./month/month.module').then(m => m.MonthModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearRoutingModule { }
