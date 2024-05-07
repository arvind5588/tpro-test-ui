import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
  imports: [ FormsModule, MatFormFieldModule ],
})

export class EditTodoComponent {
  @Input() todo: any;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  initialTitle: string = '';
  initialDescription: string = '';

  ngOnInit(): void {
    console.log(':', this.todo);
    this.initialTitle = this.todo.title;
    this.initialDescription = this.todo.description;
  }

  updateTodo() {
    this.update.emit(this.todo);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
