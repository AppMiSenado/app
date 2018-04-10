import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenatorVotingHistoryPage } from './senator-voting-history';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SenatorVotingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SenatorVotingHistoryPage),
    PipesModule
  ],
})
export class SenatorVotingHistoryPageModule {}
