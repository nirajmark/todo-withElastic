import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLocalService {
  public listOfTodo = [];
  constructor() { }

  addTodo(todo) {
    this.listOfTodo.push(todo)
  }

  getAllTodos() {
    return this.listOfTodo;
  }
}
