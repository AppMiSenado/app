import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveySenatorDetailsPage } from './survey-senator-details';

@NgModule({
  declarations: [
    SurveySenatorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveySenatorDetailsPage),
  ],
})
export class SurveySenatorDetailsPageModule {}
