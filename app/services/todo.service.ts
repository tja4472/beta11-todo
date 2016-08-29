import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { ToDo } from '../models/todo';
import { AppState } from '../reducers';
import { ToDoActions } from '../actions';
import { TodoSelector} from '../selectors';

@Injectable()
export class TodoService {
    constructor(
        private todoActions: ToDoActions,
        private store: Store<AppState>
    ) {
    }

    getData(): Observable<ToDo[]> {
        return this.store.let(TodoSelector.getToDos());
    }

    initialise(): void {
        this.store.dispatch(
            this.todoActions.load());
    }

    isLoaded(): Observable<boolean> {
        return this.store.let(TodoSelector.getLoaded());
    }

    isLoading(): Observable<boolean> {
        return this.store.let(TodoSelector.getLoading());
    }
}
