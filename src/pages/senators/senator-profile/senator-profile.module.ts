import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenatorProfilePage } from './senator-profile';

@NgModule({
  declarations: [
    SenatorProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SenatorProfilePage),
  ],
})
export class SenatorProfilePageModule {}
