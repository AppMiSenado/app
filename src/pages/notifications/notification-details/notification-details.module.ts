import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailsPage } from './notification-details';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    NotificationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailsPage),
    IonicImageLoader
  ],
})
export class NotificationDetailsPageModule {}
