import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StyleColorDirective } from './directives/style-color.directive';
import { LegislatorsCommonComponent } from './legislators-common/legislators-common.component';
import { CommitteesCommonComponent } from './committees-common/committees-common.component';

@NgModule({
  declarations: [
    StyleColorDirective,
    LegislatorsCommonComponent,
    CommitteesCommonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgbModule,
    RouterModule,
  ],
  exports: [
    StyleColorDirective,
    LegislatorsCommonComponent,
    CommitteesCommonComponent,
  ],
})
export class SharedModule {}
