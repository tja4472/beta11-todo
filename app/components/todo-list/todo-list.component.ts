import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToDo } from '../../models/todo';
// import { FivebookItemComponent } from '../fivebook-Item/fivebook-Item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // directives: [ FivebookItemComponent ],
  selector: 'todo-list',
  templateUrl: 'build/components/todo-list/todo-list.component.html',
})

export class TodoListComponent {
  @Input() public todos: ToDo[];

  constructor() {
  }

  addClick() {
    console.log('addClick');
  }

  itemSelected(item) {
    console.log('itemSelected:item>', item);
  }

  reorderItems(indexes) {
    console.log('reorderItems:indexes>', indexes);

    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }
}
