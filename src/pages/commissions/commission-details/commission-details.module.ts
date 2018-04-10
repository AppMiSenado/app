import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommissionDetailsPage } from './commission-details';
import { IonicImageLoader } from 'ionic-image-loader';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MomentModule } from 'angular2-moment';
import { DirectivesModule } from '../../../directives/directives.module';


@NgModule({
  declarations: [
    CommissionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommissionDetailsPage),
    NgCalendarModule,
		MomentModule,
		IonicImageLoader,
		DirectivesModule
  ],
})
export class CommissionDetailsPageModule {}
