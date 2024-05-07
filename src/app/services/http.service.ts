import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private toastr: ToastrService) {}

  showErrorToast(message: string) {
    this.toastr.error(message, 'Error');
  }

  private API_URL = 'http://localhost:3000/';
  httpClient = inject(HttpClient);

  addTodos(todos:string): Observable<any> {
    let requestData = {
      title:todos,
      description: todos
    }
    return this.httpClient.post(`${this.API_URL}todos`, requestData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error("Unauthorized error:", error.message);
          Swal.fire('Unauthorized error',  error.message, 'error');
        }
        return throwError(error);
      })
    );
  }
  getAllTodos(){
    return this.httpClient.get(`${this.API_URL}todos`);
  }
  updateTodos(todos:any){
    return this.httpClient.put(`${this.API_URL}todos/`+todos.id,todos)
  }

  deleteTodos(todosId:any){
    return this.httpClient.delete(`${this.API_URL}todos/`+todosId).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error("Unauthorized error:", error.message);
          Swal.fire('Unauthorized error',  error.message, 'error');
        }
        return throwError(error);
      })
    );
  }
}
