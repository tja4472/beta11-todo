import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../services/todo.service';
import { ItemSelectedOutput, ReorderItemsOutput, TodosInput, TodoListComponent } from '../../components/todo-list/todo-list.component';
// import { ToDo } from '../../models/todo';

@Component({
  directives: [TodoListComponent],
  templateUrl: 'build/pages/home/home.page.html'
})
export class HomePage {
  todos$: Observable<TodosInput>;

  constructor(
    public navCtrl: NavController,
    private todoService: TodoService) {
    this.todos$ = todoService.getData();
  }

  ionViewLoaded() {
    this.todoService.initialise();
  }

  addClick() {
    console.log('addClick');
  }  

  itemSelected(item: ItemSelectedOutput) {
    console.log('itemSelected:item>', item);
  }

  reorderItems(indexes: ReorderItemsOutput) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);    
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }  
}
