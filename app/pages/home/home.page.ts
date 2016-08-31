import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../services/todo.service';
import { EditItemOutput, CompleteItemOutput, ReorderItemsOutput, TodosInput, TodoListComponent } from '../../components/todo-list/todo-list.component';
import { ToDo } from '../../models/todo';
import { TodoPage } from '../todo/todo.page';
// import { assign } from '../../utils';

@Component({
  directives: [TodoListComponent],
  templateUrl: 'build/pages/home/home.page.html'
})
export class HomePage {
  todos$: Observable<TodosInput>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private todoService: TodoService) {
    this.todos$ = todoService.getData();
  }

  ionViewLoaded() {
    this.todoService.initialise();
  }

  addItem() {
    console.log('addItem');
    let modal = this.modalCtrl.create(TodoPage);

    modal.onDidDismiss((data: ToDo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  completeItem(item: CompleteItemOutput) {
    console.log('completeItem:item>', item);
    item.isComplete = true;
    this.todoService.save(item);
  }

  editItem(item: EditItemOutput) {
    console.log('editItem:item>', item);
    // let todo: ToDo;
    // todo = assign(todo, item);


    let modal = this.modalCtrl.create(TodoPage, { todo: item });

    modal.onDidDismiss((data: ToDo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  reorderItems(indexes: ReorderItemsOutput) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }
}
