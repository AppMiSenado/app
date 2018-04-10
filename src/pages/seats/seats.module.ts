import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeatsPage } from './seats';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    SeatsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeatsPage),
    IonicImageLoader
  ],
})
export class SeatsPageModule {}
