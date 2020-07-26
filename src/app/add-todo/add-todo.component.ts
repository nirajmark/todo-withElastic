import { Component, OnInit } from '@angular/core';
import {ApiLocalService} from '../api-local.service'

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  public todo = '';

  constructor(
    private apiLocalService: ApiLocalService
  ) { }

  ngOnInit() {
  }

  createTodo() {
    console.log('Inside create todo = ', this.todo)
    this.apiLocalService.addTodo(this.todo);
    this.todo = '';
  }

}
