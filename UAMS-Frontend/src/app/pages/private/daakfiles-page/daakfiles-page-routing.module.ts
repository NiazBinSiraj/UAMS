import { DaakfilesPageComponent } from './daakfiles-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DaakfilesPageComponent }, { path: 'year/:year', loadChildren: () => import('./year/year.module').then(m => m.YearModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaakfilesPageRoutingModule { }
