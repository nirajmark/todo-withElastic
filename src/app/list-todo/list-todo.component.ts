import { Component, OnInit } from '@angular/core';
import { ApiLocalService } from '../api-local.service'

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  public todoList = [];
  public editedObj = [];
  public isEdited = false;

  constructor(private apiLocalServer: ApiLocalService) { }

  ngOnInit() {
    this.todoList = this.apiLocalServer.getAllTodos();
  }

  delete(index) {
    console.log('deleting = ', this.todoList[index])
    this.apiLocalServer.deleteTodo(index)
  }

  edit(index) {
    if (!this.isEdited) {
      this.editedObj[index] = true;
      this.isEdited = true;
    } else {
      console.log('Already Edit in process')
    }
    
  }

  cancel(index) {
    console.log('canceling edit')
    this.editedObj[index] = false;
    this.isEdited = false;
  }

  done(index) {
    console.log('Edit is done')
    this.apiLocalServer.saveAll(this.todoList)
    this.cancel(index)
  }

}
