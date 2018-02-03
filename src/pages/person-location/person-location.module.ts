import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonLocationPage } from './person-location';

@NgModule({
  declarations: [
    PersonLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonLocationPage),
  ],
})
export class PersonLocationPageModule {}
