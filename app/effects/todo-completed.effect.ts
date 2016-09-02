import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { TodoCompletedActions } from '../actions';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class TodoCompletedEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private todoActions: TodoCompletedActions,
    private todoDataService: TodoCompletedDataService
  ) { }

  @Effect() loadCollection$ = this.updates$
    .whenAction(TodoCompletedActions.LOAD)
    .do(x => { console.log('Effect:loadCollection$:A', x); })

    // Watch database node and get items.
    .switchMap(x => this.todoDataService.getData())
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: TodoCompleted[]) => this.todoActions.loadSuccess(items));
  // Terminate effect.
  // .ignoreElements());      

  @Effect() save$ = this.updates$
    .whenAction(TodoCompletedActions.SAVE)
    .do(x => {
      console.log('Effect:save$:A', x);
      this.todoDataService.save(
        x.action.payload);
    })

  // Terminate effect.
  .ignoreElements();   
}
