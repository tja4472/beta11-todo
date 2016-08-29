import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { ToDo } from '../../models/todo';

@Component({
  directives: [TodoListComponent],
  templateUrl: 'build/pages/home/home.page.html'
})
export class HomePage {
  todos$: Observable<ToDo[]>;

  constructor(
    public navCtrl: NavController,
    private todoService: TodoService) {
    this.todos$ = todoService.getData();
  }

  ionViewLoaded() {
    this.todoService.initialise();
  }
}
