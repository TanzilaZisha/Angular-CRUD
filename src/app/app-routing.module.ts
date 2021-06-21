import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo:'/login',pathMatch: 'full'},
  { path: 'login', component: LoginComponent,pathMatch: 'full'},
  { path: 'users', component: UserComponent, 
    canActivate:[AuthGuard] },
  { path: '**', redirectTo:'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent =  [ UserComponent]
