import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommissionsListPage } from './commissions-list';
import { PipesModule } from '../../../pipes/pipes.module';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    CommissionsListPage,
  ],
  imports: [
    IonicPageModule.forChild(CommissionsListPage),
    PipesModule,
    IonicImageLoader
  ],
})
export class CommissionsListPageModule {}
