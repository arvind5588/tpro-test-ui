import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  login(loginObj : any) {
    const { email, password } = loginObj;
    return this.http.post<any>(`${this.apiUrl}auth/login`, { email, password })
      .subscribe(response => {
        const token = response.accessToken;
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
