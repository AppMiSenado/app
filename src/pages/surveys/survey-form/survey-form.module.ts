import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyFormPage } from './survey-form';

@NgModule({
  declarations: [
    SurveyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyFormPage),
  ],
})
export class SurveyFormPageModule {}
