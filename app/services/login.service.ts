import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { LoginSelector } from '../selectors';
import { LoginActions } from '../actions';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class LoginService {
    constructor(
        private af: AngularFire,
        private loginActions: LoginActions,
        private store: Store<AppState>
    ) { }

    initialise(): void {
        // Subscribe to the auth object to check for the login status
        // of the user.      
        this.af.auth.take(1).subscribe((authState: FirebaseAuthState) => {
            // Run once.
            // af.auth.unsubscribe();

            console.log('af.auth.subscribe:authState>', authState);
            let authenticated: boolean = !!authState;

            console.log('authenticated:', authenticated);

            if (authenticated) {
                this.store.dispatch(this.loginActions.restoreAuthentication(authState));
            }
        });
    }

    getLoginState() {
        return this.store.let(LoginSelector.getLoginState());
    }

anonymousAuthentication() {
    this.store.dispatch(
      this.loginActions.anonymousAuthentication());
}
    
    emailAuthentication(
        userName: string,
        password: string
    ) {
      this.store.dispatch(
        this.loginActions.emailAuthentication(
          userName,
          password));
    }

    googleAuthentication() {
     this.store.dispatch(
      this.loginActions.googleAuthentication());       
    }
}
