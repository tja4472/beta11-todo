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
  ) { }

  @Effect() loadCollection$ = this.updates$
    .whenAction(ToDoActions.LOAD)
    .do(x => { console.log('Effect:loadCollection$:A', x); })

    // Watch database node and get items.
    .switchMap(x => this.todoDataService.getData())
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: ToDo[]) => this.todoActions.loadSuccess(items));
  // Terminate effect.
  // .ignoreElements());  

  @Effect() reorderList$ = this.updates$
    .whenAction(ToDoActions.REORDER_LIST)
    .do(x => {
      console.log('Effect:reorderList$:A', x);
      this.todoDataService.reorderItemsAndUpdate(
        x.action.payload.indexes,
        x.state.todo.todos);
    })

  // Terminate effect.
  .ignoreElements();      

  @Effect() removeItem$ = this.updates$
    .whenAction(ToDoActions.REMOVE)
    .do(x => {
      console.log('Effect:removeItem$:A', x);
      this.todoDataService.removeItem(
        x.action.payload);
    })

  // Terminate effect.
  .ignoreElements();  

  @Effect() save$ = this.updates$
    .whenAction(ToDoActions.SAVE)
    .do(x => {
      console.log('Effect:save$:A', x);
      this.todoDataService.save(
        x.action.payload);
    })

  // Terminate effect.
  .ignoreElements();   
}
