import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const API_URL = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpClient = inject(HttpClient);
  constructor() { }

  addTodos(todos:string){
    return this.httpClient.post(`${API_URL}todos`,{
      title:todos
    })
  }
  getAllTodos(){
     return this.httpClient.get(`${API_URL}todos`);
  }
  updateTodos(todos:any){
    return this.httpClient.put(`${API_URL}todos/`+todos.id,todos)
  }
}
