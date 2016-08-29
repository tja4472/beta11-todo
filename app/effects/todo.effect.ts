import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { ToDoActions } from '../actions';
import { TodoDataService } from '../services/todo.data.service';
import { ToDo } from '../models/todo';

@Injectable()
export class ToDoEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private todoActions: ToDoActions,
    private todoDataService: TodoDataService
  ) {}

  @Effect() loadCollection$ = this.updates$
    .whenAction(ToDoActions.LOAD)
    .do(x => { console.log('Effect:loadCollection$:A', x); })

    // Watch database node and get items.
    .switchMap(x => this.todoDataService.getData())
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: ToDo[]) => this.todoActions.loadSuccess(items));
  // Terminate effect.
  // .ignoreElements());  
}
