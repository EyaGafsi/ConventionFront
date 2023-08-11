import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RhComponent } from './convention/rh/rh.component';
import { LoginComponent } from './authentication/login/login.component';
import { AccessDeniedComponent } from './authentication/access-denied/access-denied.component';
import { HeaderComponent } from './head/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserService } from './authentication/_services/user.service';
import { CommonModule } from '@angular/common';
import { DemandeComponent } from './demande_convention/demande/demande.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './authentication/_auth/auth.guard';
import { AuthInterceptor } from './authentication/_auth/auth.interceptor';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DemandeUserComponent } from './demande_convention/demande-user/demande-user.component';
import { DemandesComponent } from './demande_convention/demandes/demandes.component';
import { EmployeeComponent } from './convention/employee/employee.component';
import { AdminComponent } from './user/admin/admin.component';
import { AboutComponent } from './home_page/about/about.component';
import { HomeComponent } from './home_page/home/home.component';
import { ContactComponent } from './home_page/contact/contact.component';
import { ServicesComponent } from './home_page/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    RhComponent,
    EmployeeComponent,
    LoginComponent,
    HomeComponent,
    AccessDeniedComponent,
    HeaderComponent,
    SignUpComponent,
    AdminComponent,
    DemandeComponent,
    DemandesComponent,
    FooterComponent,
    DemandeUserComponent,
    ContactComponent,
    AboutComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,ReactiveFormsModule
  ],
  providers: [
    AuthGuard,{
      provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptor,
      multi:true,
    },
    UserService,      
    
    StompService,


    {
      provide: StompConfig,
      useValue: {
        url: 'ws://localhost:8084/stomp',
        headers: {
        },
        heartbeat_in: 0,
        heartbeat_out: 20000,
        reconnect_delay: 5000,
        debug: true      }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
