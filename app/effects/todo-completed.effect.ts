import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { TodoCompletedActions } from '../actions';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class TodoCompletedEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private actions: TodoCompletedActions,
    private dataService: TodoCompletedDataService,
    private fb1DataService: Fb1DataService
  ) { }

  @Effect() loadCollection$ = this.updates$
    .whenAction(TodoCompletedActions.LOAD)
    .do(x => { console.log('Effect:loadCollection$:A', x); })
    .filter(x => x.state.login.isAuthenticated)

    // Watch database node and get items.
    .switchMap(x => this.dataService.getData())
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: TodoCompleted[]) => this.actions.loadSuccess(items));
  // Terminate effect.
  // .ignoreElements());      

  @Effect() moveToCurrent$ = this.updates$
    .whenAction(TodoCompletedActions.MOVE_TO_CURRENT)
    .do(x => {
      console.log('Effect:moveToCurrent$:A', x);
      this.fb1DataService.moveToCuurent(
        x.action.payload);
    })

    // Terminate effect.
    .ignoreElements();

  @Effect() removeItem$ = this.updates$
    .whenAction(TodoCompletedActions.REMOVE)
    .do(x => {
      console.log('Effect:removeItem$:A', x);
      this.dataService.removeItem(
        x.action.payload);
    })

    // Terminate effect.
    .ignoreElements();

  @Effect() save$ = this.updates$
    .whenAction(TodoCompletedActions.SAVE)
    .do(x => {
      console.log('Effect:save$:A', x);
      this.dataService.save(
        x.action.payload);
    })

    // Terminate effect.
    .ignoreElements();
}
