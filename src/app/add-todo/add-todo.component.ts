import { Component, OnInit } from '@angular/core';
import {ApiLocalService} from '../api-local.service'
import { ElasticApiService } from '../elastic-api.service'

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  public todo = '';

  constructor(
    private apiLocalService: ApiLocalService,
    private elasticApiService: ElasticApiService
  ) { }

  ngOnInit() {
  }

  async createTodo() {
    if (this.todo) {
      console.log('Inside create todo = ', this.todo)
      // this.apiLocalService.addTodo(this.todo); //for storing it locally
      //  Using Elastic api's
      await this.elasticApiService.addTodo(this.todo)
      this.todo = '';
    } else {
      console.log("Can not create empty todo")
    }
    
  }

}
