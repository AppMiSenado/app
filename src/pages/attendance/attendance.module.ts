import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePage } from './attendance';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    AttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePage),
    IonicImageLoader
  ],
})
export class AttendancePageModule {}
