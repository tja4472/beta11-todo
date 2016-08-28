import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ToDo } from '../models/todo';

export interface TodoState {
    loaded: boolean;
    loading: boolean;
    todos: ToDo[];
}

const initialState: TodoState = {
    loaded: false,
    loading: false,
    todos: []
};

// =========
// Reducer
// =========
export default function (
    state = initialState,
    action: Action): TodoState {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

// =========
// Selectors
// =========
export function getTodos() {
  return (state$: Observable<TodoState>) => state$
    .select(s => s.todos);
}

export function getLoaded() {
  return (state$: Observable<TodoState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<TodoState>) => state$
    .select(s => s.loading);
}
