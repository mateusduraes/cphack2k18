import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPersonDetailPage } from './find-person-detail';

@NgModule({
  declarations: [
    FindPersonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPersonDetailPage),
  ],
})
export class FindPersonDetailPageModule {}
