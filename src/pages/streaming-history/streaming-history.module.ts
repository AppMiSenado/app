import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreamingHistoryPage } from './streaming-history';

@NgModule({
  declarations: [
    StreamingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StreamingHistoryPage),
  ],
})
export class StreamingHistoryPageModule {}
