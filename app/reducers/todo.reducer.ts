import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ToDoActions } from '../actions';
import { ToDo } from '../models/todo';
import { assign } from '../utils';

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
        case ToDoActions.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case ToDoActions.LOAD_SUCCESS: {
            const items: ToDo[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todos: items.map(book => book)
            };
        }

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
