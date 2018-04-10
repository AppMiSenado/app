import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyListPage } from './survey-list';

import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    SurveyListPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyListPage),
    IonicImageLoader
  ],
})
export class SurveyListPageModule {}
