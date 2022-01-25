import { OfficesPageComponent } from './offices-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OfficesPageComponent },
  { path: 'offices/:id', loadChildren: () => import('./work-category/work-category.module').then(m => m.WorkCategoryModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesPageRoutingModule { }
