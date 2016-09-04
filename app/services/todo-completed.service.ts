import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { TodoCompleted } from '../models/todo-completed';

import { AppState } from '../reducers';
import { TodoCompletedActions } from '../actions';
import { TodoCompletedSelector } from '../selectors';

@Injectable()
export class TodoCompletedService {
    constructor(
        private actions: TodoCompletedActions,
        private store: Store<AppState>
    ) {
    }

    getData(): Observable<TodoCompleted[]> {
        /*  
                this.store.select(s => s.todoCompleted)
                .subscribe(x => console.log('sssss>', x));      
                let a = this.store.select(s => s.todoCompleted.todoCompletedList);
                return a;
        */
        return this.store.let(TodoCompletedSelector.getTodoCompletedList());
    }

    initialise(): void {
        this.store.dispatch(
            this.actions.load());
    }

    isLoaded(): Observable<boolean> {
        return this.store.let(TodoCompletedSelector.getLoaded());
    }

    isLoading(): Observable<boolean> {
        return this.store.let(TodoCompletedSelector.getLoading());
    }

    remove(todo: TodoCompleted) {
        this.store.dispatch(
            this.actions.remove(todo.$key));
    }

    save(item: TodoCompleted) {
        this.store.dispatch(
            this.actions.save(item));
    }
}
