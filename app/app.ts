import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { Page1 } from './pages/page1/page1';
// import { Page2 } from './pages/page2/page2';
import { ViewCompletedPage } from './pages/view-completed/view-completed.page';

import { provideStore }from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
// import { compose } from '@ngrx/core/compose';
// import actions, { LoginActions } from './actions';
import actions from './actions';
import effects from './effects';
// import reducer, { AppState } from './reducers';
import reducers from './reducers';
// import { LoginSelector } from './selectors';

import { Fb1DataService } from './services/fb1.data.service';
import { LoginService } from './services/login.service';
import { TodoCompletedDataService } from './services/todo-completed.data.service';
import { TodoCompletedService } from './services/todo-completed.service';
import { TodoDataService } from './services/todo.data.service';
import { TodoService } from './services/todo.service';

import {
  defaultFirebase,
  FIREBASE_PROVIDERS,
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
  loginState$: any;
  pages: Array<{ title: string, component: any }>;
  private subscription;

  constructor(
    private loginService: LoginService,
    public platform: Platform
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Current todos', component: HomePage },
      { title: 'Completed todos', component: ViewCompletedPage },
      { title: 'Login', component: LoginPage },
      { title: 'Signup', component: SignupPage },
      { title: 'Logout', component: LoginPage }
    ];

    loginService.initialise();

    this.loginState$ = loginService.getLoginState();

    this.subscription = loginService.getLoginState()
      .subscribe(loginState => {
        console.log('loginState>', loginState);
        console.log('loginState.isAuthenticated>', loginState.isAuthenticated);
        console.log('loginState.isAuthenticating>', loginState.isAuthenticating);

        if (loginState.isAuthenticating) {
          // this.rootPage = Page1;
        } else if (loginState.isAuthenticated) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
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

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.loginService.logout();
      }, 1000);
    }
  }
}

ionicBootstrap(MyApp, [
  Fb1DataService,
  LoginService,
  TodoCompletedDataService,
  TodoCompletedService,
  TodoDataService,
  TodoService,
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
