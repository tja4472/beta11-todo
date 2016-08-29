import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoService } from '../../services/todo.service';

@Component({
  templateUrl: 'build/pages/home/home.page.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private todoService: TodoService) {
  }

  ionViewLoaded() {
    this.todoService.initialise();
  }
}
