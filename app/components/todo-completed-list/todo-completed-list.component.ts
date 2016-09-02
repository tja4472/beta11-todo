import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoCompleted } from '../../models/todo-completed';

/*
export type ToggleCompleteItemOutput = ToDo;
export type EditItemOutput = ToDo;
export type ReorderItemsOutput = {
  from: number,
  to: number
};
*/
export type dataInput = TodoCompleted[];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-completed-list',
  templateUrl: 'build/components/todo-completed-list/todo-completed-list.component.html',
})
export class TodoCompletedListComponent {
  @Input() public data: dataInput;
/*  
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<ToggleCompleteItemOutput>();  
  @Output() public editItem = new EventEmitter<EditItemOutput>();
  @Output() public reorderItems = new EventEmitter<ReorderItemsOutput>();
*/

  constructor() {
  }
/*
removeItem(item) {
   console.log('removeItem>', item);
}

  aaaaa() {
    console.log('aaaaa');
  }

  bb() {
    console.log('bb');
  }
*/
}
