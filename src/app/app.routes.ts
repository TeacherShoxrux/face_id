import { Routes } from '@angular/router';
import { Success } from './success/success';
import { Login } from './login/login';
export const routes: Routes = [
  { path: '', component: Login },
  { path: 'success', component: Success }
];
