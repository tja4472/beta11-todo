import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToDo } from '../models/todo';

@Injectable()
export class ToDoActions {
  static LOAD = '[ToDoActions] Load';
  load(): Action {
    return {
      type: ToDoActions.LOAD
    };
  }

  static LOAD_SUCCESS = '[ToDoActions] Load Success';
  loadSuccess(items: ToDo[]): Action {
    return {
      type: ToDoActions.LOAD_SUCCESS,
      payload: items
    };
  }

  static REORDER_LIST = '[ToDoActions] Reorder List';
  reorderList(
    fromIndex: number,
    toIndex: number
  ): Action {
    return {
      type: ToDoActions.REORDER_LIST,
      payload: {
        fromIndex: fromIndex,
        toIndex: toIndex
      }
    };
  }
}
