import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    PipesModule
  ],
})
export class FavoritesPageModule {}
