import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillsListPage } from './bills-list';

@NgModule({
  declarations: [
    BillsListPage,
  ],
  imports: [
    IonicPageModule.forChild(BillsListPage),
  ],
})
export class BillsListPageModule {}
