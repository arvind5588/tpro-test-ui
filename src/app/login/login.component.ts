import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: Login;
  constructor(private authService: AuthService) {
    this.loginObj = new Login();
  }

  login() {
    this.authService.login(this.loginObj);
  }
}

export class Login{
  email: string;
  password: string;
  constructor(){
    this.email = '';
    this.password = '';
  }
}
