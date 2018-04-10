import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionDetailsPage } from './question-details';

@NgModule({
  declarations: [
    QuestionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionDetailsPage),
  ],
})
export class QuestionDetailsPageModule {}
