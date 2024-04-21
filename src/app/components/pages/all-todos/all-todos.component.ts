import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TodosListComponent } from '../../todos-list/todos-list.component';
import { StateService } from '../../../services/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TodosListComponent],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  constructor(private toastr: ToastrService) {}

  showErrorToast(message: string) {
    this.toastr.error(message, 'Error');
  }

  newTodos = '';
  intialTodosList: any[] = [];
  todosList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);
  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      if (value) {
        this.todosList = this.intialTodosList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      }else{
        this.todosList=this.intialTodosList;
      }
    });
    this.getAllTodos();
  }
  addTodos() {
      this.httpService.addTodos(this.newTodos).subscribe(() => {
        this.newTodos = '';
        this.getAllTodos();
      },
      (error) => {
        this.showErrorToast('Failed to create todo: ' + error.message);
      }
    );
  }
  getAllTodos() {
    this.httpService.getAllTodos().subscribe((result: any) => {
      this.intialTodosList = this.todosList = result;
    });
  }
  onComplete(todos: any) {
    todos.completed = true;
    this.httpService.updateTodos(todos).subscribe(() => {
      this.getAllTodos();
    });
  }
  onImportant(todos: any) {
    todos.important = true;
    this.httpService.updateTodos(todos).subscribe(() => {
      this.getAllTodos();
    });
  }
}
