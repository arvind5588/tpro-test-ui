import { Component, inject, Input } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TodosListComponent } from '../../todos-list/todos-list.component';

@Component({
  selector: 'app-active-todos',
  standalone: true,
  imports: [PageTitleComponent, TodosListComponent],
  templateUrl: './active-todos.component.html',
  styleUrl: './active-todos.component.scss'
})
export class ActiveTodosComponent {
  todosList: any[] = [];
  httpService=inject(HttpService);

  ngOnInit(){
    this.getAllTodos();
  }
  getAllTodos(){
    this.httpService.getAllTodos().subscribe((result:any)=>{
      this.todosList=result.filter((x:any)=>x.completed==true);
    })
  }
  onComplete(todos:any){
    todos.completed=true;
    this.httpService.updateTodos(todos).subscribe(()=>{
      this.getAllTodos();
    })
  }
  onImportant(todos:any){
    todos.important=true;
    this.httpService.updateTodos(todos).subscribe(()=>{
      this.getAllTodos();
    })
  }
}
