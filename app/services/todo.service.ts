import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Indexes } from '../models/indexes';
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

    clearCompletedItems() {
        this.store.dispatch(
            this.todoActions.clearCompleted()
        );
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

    reorderItems(indexes: Indexes) {
        this.store.dispatch(
            this.todoActions.reorderList(indexes));
    }

    remove(todo: ToDo) {
        this.store.dispatch(
            this.todoActions.remove(todo.$key));
    }

    save(todo: ToDo) {
        this.store.dispatch(
            this.todoActions.save(todo));
    }
}
