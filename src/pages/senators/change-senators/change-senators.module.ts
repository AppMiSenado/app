import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeSenatorsPage } from './change-senators';
import { IonicImageLoader } from 'ionic-image-loader';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ChangeSenatorsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeSenatorsPage),
    PipesModule,
    IonicImageLoader
  ],
})
export class ChangeSenatorsPageModule {}
