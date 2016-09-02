import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../../models/todo';


export type ToggleCompleteItemOutput = ToDo;
export type EditItemOutput = ToDo;
export type ReorderItemsOutput = {
  from: number,
  to: number
};
export type RemoveItemOutput = ToDo;
export type TodosInput = ToDo[];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-list',
  templateUrl: 'build/components/todo-list/todo-list.component.html',
})
export class TodoListComponent {
  @Input() public todos: TodosInput;
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<ToggleCompleteItemOutput>();  
  @Output() public editItem = new EventEmitter<EditItemOutput>();
  @Output() public reorderItems = new EventEmitter<ReorderItemsOutput>();
  @Output() public removeItem = new EventEmitter<RemoveItemOutput>();  

  constructor() {
  } 
}
