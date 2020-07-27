import { Component, OnInit } from '@angular/core';
import { ApiLocalService } from '../api-local.service'
import { ElasticApiService } from '../elastic-api.service'

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  public todoList = [];
  public editedObj = [];
  public isEdited = false;

  constructor(
    private apiLocalServer: ApiLocalService,
    private elasticApiService: ElasticApiService
    ) { }

  async ngOnInit() {
    // this.todoList = this.apiLocalServer.getAllTodos();
    this.todoList = await this.elasticApiService.getAllTodos();
  }

  delete(index) {
    console.log('deleting = ', this.todoList[index])
    // this.apiLocalServer.deleteTodo(index)
    if (this.todoList[index]['_id']) {
      this.elasticApiService.deleteTodo(index, this.todoList[index]['_id'])
    }
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

  async done(index) {
    console.log('Edit is done')
    // this.apiLocalServer.saveAll(this.todoList)
    if (this.todoList[index]['_id']) {
      await this.elasticApiService.updateTodo(index, this.todoList[index]['_id'], this.todoList[index]['text'])
    }
    this.cancel(index)
  }

}
