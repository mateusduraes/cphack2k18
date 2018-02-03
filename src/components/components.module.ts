import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader';
import { IonicModule } from 'ionic-angular';
import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from './timeline/timeline';

@NgModule({
	declarations: [LoaderComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent],
	imports: [IonicModule],
	exports: [LoaderComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent]
})
export class ComponentsModule {}
