import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './month.component';

const routes: Routes = [{ path: '', component: MonthComponent }, { path: 'month/:month', loadChildren: () => import('./files/files.module').then(m => m.FilesModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthRoutingModule { }
