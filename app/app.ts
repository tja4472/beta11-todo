import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home.page';
import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';

import { provideStore }from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
// import { compose } from '@ngrx/core/compose';
// import actions, { LoginActions } from './actions';
import actions from './actions';
import effects from './effects';
// import reducer, { AppState } from './reducers';
import reducers from './reducers';
// import { LoginSelector } from './selectors';

import {
  AngularFire,
  defaultFirebase,
  FIREBASE_PROVIDERS,
  FirebaseAuthState
} from 'angularfire2';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public af: AngularFire,
    public platform: Platform
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 },
      { title: 'Home page', component: HomePage }
    ];

    // Subscribe to the auth object to check for the login status
    // of the user.      
    af.auth.take(1).subscribe((authState: FirebaseAuthState) => {
      // Run once.
      // af.auth.unsubscribe();

      console.log('af.auth.subscribe:authState>', authState);
      let authenticated: boolean = !!authState;

      console.log('authenticated:', authenticated);

      if (authenticated) {
        // this.store.dispatch(loginActions.restoreAuthentication(authState));
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [
  /**
   * provideStore is run once at application bootstrap, accepting a reducer
   * function or object map of reducer functions. If passed an object of
   * reducers, combineReducers will be run creating your application
   * meta-reducer. This returns all providers for an @ngrx/store
   * based application.
   *
   * Source: https://github.com/ngrx/store/blob/master/src/ng2.ts#L43-L69
   */
  provideStore(reducers),

  /**
   * runEffects configures all providers for @ngrx/effects. Observables decorated
   * as an @Effect() within the supplied services will ultimately be merged,
   * with output of relevant (registered as effects) actions being
   * dispatched into your application store. Any side-effects in
   * your application should be registered as effects.
   *
   * Source: https://github.com/ngrx/effects/blob/master/lib/run-effects.ts#L8-L20
   */
  runEffects(effects),

  /**
   * Finally we provide additional services and action creators so they can
   * be used by all of our components, effects, and guards.
   */
  // services,
  actions,
  // guards,  
  FIREBASE_PROVIDERS,

  // Initialize Firebase app  
  defaultFirebase(MyFirebaseAppConfig.config)
]);
