import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RhComponent } from './convention/rh/rh.component';
import { LoginComponent } from './authentication/login/login.component';
import { AccessDeniedComponent } from './authentication/access-denied/access-denied.component';
import { DemandeComponent } from './demande_convention/demande/demande.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthGuard } from './authentication/_auth/auth.guard';
import { DemandesComponent } from './demande_convention/demandes/demandes.component';
import { DemandeUserComponent } from './demande_convention/demande-user/demande-user.component';
import { EmployeeComponent } from './convention/employee/employee.component';
import { AdminComponent } from './user/admin/admin.component';
import { HomeComponent } from './home_page/home/home.component';
import { ContactComponent } from './home_page/contact/contact.component';
import { AboutComponent } from './home_page/about/about.component';
import { ServicesComponent } from './home_page/services/services.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'service',component:ServicesComponent},
  {path:'contact',component:ContactComponent},
  {path:'rh',component:RhComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RH']}},
  {path:'employee',component:EmployeeComponent,canActivate:[AuthGuard],data:{roles:['ROLE_EMPLOYEE']}},
  {path:'login',component:LoginComponent},
  {path:'accessDenied',component:AccessDeniedComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  {path:'demande',component:DemandeComponent,canActivate:[AuthGuard],data:{roles:['ROLE_EMPLOYEE']}},
  {path:'demandes',component:DemandesComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RH']}},
  {path:'demandesUser',component:DemandeUserComponent,canActivate:[AuthGuard],data:{roles:['ROLE_EMPLOYEE']}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
