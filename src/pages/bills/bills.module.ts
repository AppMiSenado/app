import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillsPage } from './bills';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BillsPage,
  ],
  imports: [
    IonicPageModule.forChild(BillsPage),
    PipesModule
  ],
})
export class BillsPageModule {}
