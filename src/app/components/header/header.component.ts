import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { debounceTime } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styles: '',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  stateService = inject(StateService);
  searchControl = new FormControl('');
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value) => {
      this.stateService.searchSubject.next(value || '');
    });
  }

  token: string | null = this.authService.getToken();
  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.authService.logout();
  }
}
