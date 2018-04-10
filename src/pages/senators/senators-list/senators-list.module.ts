import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { SenatorsListPage } from './senators-list';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SenatorsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SenatorsListPage),
    PipesModule,
    IonicImageLoader
  ],
})
export class SenatorsListPageModule {}
