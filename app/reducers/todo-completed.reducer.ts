import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TodoCompletedActions } from '../actions';
import { TodoCompleted } from '../models/todo-completed';
import { assign } from '../utils';

export interface TodoCompletedState {
    loaded: boolean;
    loading: boolean;
    todoCompletedList: TodoCompleted[];
}

const initialState: TodoCompletedState = {
    loaded: false,
    loading: false,
    todoCompletedList: []
};

// =========
// Reducer
// =========
export default function (
    state = initialState,
    action: Action): TodoCompletedState {
    switch (action.type) {
        case TodoCompletedActions.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case TodoCompletedActions.LOAD_SUCCESS: {
            const items: TodoCompleted[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todoCompletedList: items.map(book => book)
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
export function getTodoCompletedList() {
    return (state$: Observable<TodoCompletedState>) => state$
        .select(s => s.todoCompletedList);
}

export function getLoaded() {
    return (state$: Observable<TodoCompletedState>) => state$
        .select(s => s.loaded);
}

export function getLoading() {
    return (state$: Observable<TodoCompletedState>) => state$
        .select(s => s.loading);
}
