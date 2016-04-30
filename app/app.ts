import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {RegisterPage} from './pages/register/register';

import {GrouptifyService} from "./models/GrouptifyService";


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [GrouptifyService]
})
class MyApp {
  rootPage: any = GettingStartedPage;
  pages: Array<{title: string, component: any}>

  constructor(private app: IonicApp, private platform: Platform/*, grouptifyService: GrouptifyService*/) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Projects', component: GettingStartedPage },
      { title: 'Account', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // GrouptifyService.authenticate();
        this.rootPage = RegisterPage;
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
