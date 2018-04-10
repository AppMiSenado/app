import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareVotePage } from './share-vote';

@NgModule({
  declarations: [
    ShareVotePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareVotePage),
  ],
})
export class ShareVotePageModule {}
