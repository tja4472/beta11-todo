import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

// import { AppState, FivebookItemState, getFivebookItems, getLoaded, getLoading } from '../reducers';
import { AppState } from '../reducers';
import * as TodoCompletedReducer from '../reducers/todo-completed.reducer';
/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the books state then we pass the state to the book
 * reducer's getBooks selector, finally returning an observable
 * of search results.
 */
export function getTodoCompletedState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.todoCompleted);
}

export function getLoaded() {
  return compose(TodoCompletedReducer.getLoaded(), getTodoCompletedState());
}

export function getLoading() {
  return compose(TodoCompletedReducer.getLoading(), getTodoCompletedState());
}

export function getTodoCompletedList() {
  return compose(TodoCompletedReducer.getTodoCompletedList(), getTodoCompletedState());
}
