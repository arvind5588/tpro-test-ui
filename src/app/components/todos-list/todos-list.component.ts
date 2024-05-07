import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoComponent } from '../../edit-todo/edit-todo.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})

export class TodosListComponent {
  @Input()  todosList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  httpService = inject(HttpService);

  constructor(private dialog: MatDialog) {}

  openEditDialog(todo: any) {
    console.log(todo);
    const dialogRef = this.dialog.open(EditTodoComponent, {
      data: todo
    });

    dialogRef.afterClosed().subscribe(updatedTodo => {
      if (updatedTodo) {
        console.log(updatedTodo);
      }
    });
  }


  deleteTodo(todoId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this todo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.deleteTodos(todoId).subscribe(() => {
          this.todosList = this.todosList.filter(todo => todo.id !== todoId);
          Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
        });
      }
    });
  }


}
