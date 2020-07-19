import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';
import { VotesComponent } from './votes/votes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VoteDetailComponent, VotesComponent],
  imports: [CommonModule, RouterModule],
})
export class VoteModule {}
