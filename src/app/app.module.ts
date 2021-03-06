import { NotificationsPage } from './../pages/notifications/notifications';
import { ComponentsModule } from './../components/components.module';
import { DirectivesModule } from './../directives/directives.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Oauth } from 'ng2-cordova-oauth/oauth';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Network } from '@ionic-native/network';
import { ServerServiceModule } from '@pluritech/server-service';
import { AuthServiceModule } from '@pluritech/auth-service';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { CampusAttractionsPage } from './../pages/campus-attractions/campus-attractions';
import { SocialPage } from './../pages/social/social';
import { TicketPage } from '../pages/ticket/ticket';
import { FindPersonPage } from './../pages/find-person/find-person';
import { InvitePage } from './../pages/invite/invite';
import { HilightsPage } from './../pages/hilights/hilights';
import { HowArrivePage } from '../pages/how-arrive/how-arrive';
import { AboutPage } from '../pages/about/about';
import { PersonLocationPage } from '../pages/person-location/person-location';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { EventsPage } from '../pages/events/events';
import { FindPersonDetailPage } from '../pages/find-person-detail/find-person-detail';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { OfServiceProvider } from '../providers/of-service/of-service';
import { OfStorage } from '../providers/of-service/of-storage';
import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    EventsPage,
    SocialPage,
    InvitePage,
    FindPersonPage,
    FindPersonDetailPage,
    PersonLocationPage,
    HowArrivePage,
    TicketPage,
    HilightsPage,
    CampusAttractionsPage,
    NotificationsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ServerServiceModule.forRoot(),
    AuthServiceModule.forRoot('authkeycp'),
    DirectivesModule,
    ComponentsModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: EventsPage, name: 'EventsPage', segment: 'events' },
        { component: TabsPage, name: 'TabsPage', segment: 'event/:eventSlug' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: FindPersonPage, name: 'FindPersonPage', segment: 'findperson' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: HowArrivePage, name: 'HowArrivePage', segment: 'arrive' },
        { component: TicketPage, name: 'TicketPage', segment: 'ticket' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: HilightsPage, name: 'HilightsPage', segment: 'hilight' },
        { component: CampusAttractionsPage, name: 'CampusAttractionsPage', segment: 'attractions' },
        { component: NotificationsPage, name: 'NotificationsPage', segment: 'notifications' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [
    IonicApp,
  ],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    EventsPage,
    SocialPage,
    InvitePage,
    FindPersonPage,
    FindPersonDetailPage,
    PersonLocationPage,
    HowArrivePage,
    TicketPage,
    HilightsPage,
    CampusAttractionsPage,
    NotificationsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Oauth, useClass: OauthCordova },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    Network,
    OfServiceProvider,
    OfStorage,
    ApiProvider,
    AuthProvider,
  ]
})
export class AppModule { }
