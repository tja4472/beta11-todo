import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class TodoCompletedActions {
  static LOAD = '[TodoCompletedActions] Load';
  load(): Action {
    return {
      type: TodoCompletedActions.LOAD
    };
  }

  static LOAD_SUCCESS = '[TodoCompletedActions] Load Success';
  loadSuccess(items: TodoCompleted[]): Action {
    return {
      type: TodoCompletedActions.LOAD_SUCCESS,
      payload: items
    };
  }

  static MOVE_TO_CURRENT = '[TodoCompletedActions] Move To Current';
  moveToCurrent(item: TodoCompleted): Action {
    return {
      type: TodoCompletedActions.MOVE_TO_CURRENT,
      payload: item
    };
  }

  static REMOVE = '[TodoCompletedActions] Remove';
  remove(itemKey: string): Action {
    return {
      type: TodoCompletedActions.REMOVE,
      payload: itemKey
    };
  }

  static SAVE = '[TodoCompletedActions] Save';
  save(item: TodoCompleted): Action {
    return {
      type: TodoCompletedActions.SAVE,
      payload: item
    };
  }
}
