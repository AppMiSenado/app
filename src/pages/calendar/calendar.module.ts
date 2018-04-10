import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    NgCalendarModule,
    MomentModule
  ],
})
export class CalendarPageModule {}
