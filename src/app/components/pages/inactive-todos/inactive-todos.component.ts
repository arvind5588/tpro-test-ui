import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TodosListComponent } from '../../todos-list/todos-list.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-inactive-todos',
  standalone: true,
  imports: [PageTitleComponent, TodosListComponent],
  templateUrl: './inactive-todos.component.html',
  styleUrl: './inactive-todos.component.scss',
})
export class InActiveTodosComponent {
  todosList:any[]=[];
  httpService=inject(HttpService);

  ngOnInit(){
    this.getAllTodos();
  }
  getAllTodos(){
    this.httpService.getAllTodos().subscribe((result:any)=>{
      this.todosList=result.filter((x:any)=>x.important==true);
    })
  }
  onComplete(todos:any){
    todos.completed=true;
    console.log("complete",todos)
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
