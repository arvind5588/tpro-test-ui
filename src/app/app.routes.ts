import { Routes } from '@angular/router';
import { AllTodosComponent } from './components/pages/all-todos/all-todos.component';
import { ActiveTodosComponent } from './components/pages/active-todos/active-todos.component';
import { InActiveTodosComponent } from './components/pages/inactive-todos/inactive-todos.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AllTodosComponent,
  },
  {
    path: 'todo',
    component: AllTodosComponent,
  },
  {
    path: 'active',
    component: ActiveTodosComponent,
  },
  {
    path: 'inactive',
    component: InActiveTodosComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
