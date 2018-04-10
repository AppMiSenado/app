import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenatorAttendanceHistoryPage } from './senator-attendance-history';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SenatorAttendanceHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SenatorAttendanceHistoryPage),
    PipesModule
  ],
})
export class SenatorAttendanceHistoryPageModule {}
