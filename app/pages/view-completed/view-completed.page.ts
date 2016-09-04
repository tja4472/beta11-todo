import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TodoCompletedService } from '../../services/todo-completed.service';

import {
  DataInput,
  EditItemOutput,
  TodoCompletedListComponent
} from '../../components/todo-completed-list/todo-completed-list.component';

@Component({
  directives: [TodoCompletedListComponent],
  templateUrl: 'build/pages/view-completed/view-completed.page.html'
})
export class ViewCompletedPage {
  data$: Observable<DataInput>;

  constructor(
    public navCtrl: NavController,
    public todoCompletedService: TodoCompletedService
  ) {
    //
    this.data$ = todoCompletedService.getData();
  }

  ionViewLoaded() {
    this.todoCompletedService.initialise();
  }

  editItem(item: EditItemOutput) {
    console.log('editItem:item>', item);
  }
}
