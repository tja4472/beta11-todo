import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../../models/todo';

export type TodosInput = ToDo[];
export type ItemSelectedOutput = ToDo;
export type ReorderItemsOutput = {
  from: number,
  to: number
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-list',
  templateUrl: 'build/components/todo-list/todo-list.component.html',
})
export class TodoListComponent {
  @Input() public todos: TodosInput;
  @Output() public addClick = new EventEmitter();
  @Output() public itemSelected = new EventEmitter<ItemSelectedOutput>();
  @Output() public reorderItems = new EventEmitter<ReorderItemsOutput>();

  constructor() {
  }
}
