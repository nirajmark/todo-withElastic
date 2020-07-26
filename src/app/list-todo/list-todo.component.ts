import { Component, OnInit } from '@angular/core';
import { ApiLocalService } from '../api-local.service'

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  public todoList = [];
  public editedObj = []

  constructor(private apiLocalServer: ApiLocalService) { }

  ngOnInit() {
    this.todoList = this.apiLocalServer.getAllTodos();
  }

  delete(todo) {
    console.log('deleting = ', todo)
  }

  edit(index) {
    this.editedObj[index] = true;
  }

  doneEdit(todo) {
    // this.editedObj[]
  }

}
