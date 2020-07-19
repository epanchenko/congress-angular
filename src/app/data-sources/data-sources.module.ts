import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourcesComponent } from './data-sources/data-sources.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'all',
    component: DataSourcesComponent,
  },
];

@NgModule({
  declarations: [DataSourcesComponent],
  imports: [
    RouterModule.forChild(
      routes /*, { scrollPositionRestoration: 'enabled' }*/
    ),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class DataSourcesModule {}
