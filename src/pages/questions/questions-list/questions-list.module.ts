import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsListPage } from './questions-list';

@NgModule({
  declarations: [
    QuestionsListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsListPage),
  ],
})
export class QuestionsListPageModule {}
