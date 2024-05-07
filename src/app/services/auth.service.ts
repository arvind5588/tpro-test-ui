import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';
  authStatus: any;

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  login(loginObj : any) {
    const { email, password } = loginObj;
    return this.http.post<any>(`${this.apiUrl}auth/login`, { email, password })
      .subscribe((response: { accessToken: any; }) => {
        const token = response.accessToken;
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/todo');
        //window.location.reload();
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    //window.location.reload();
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    console.log(!!this.getToken());
    return !!this.getToken();
  }
}
