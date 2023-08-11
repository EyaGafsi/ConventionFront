import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import {Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message;
  showFailedAlert=false;
constructor(
  private userService: UserService, 
  private userAuthService:UserAuthService,
  private router: Router){}
ngOnInit():void{}
/**
 * The login function takes in a login form, sends the form data to the server for authentication, and
 * then redirects the user to the appropriate page based on their role.
 * @param {NgForm} loginForm - The loginForm parameter is of type NgForm, which is a form object in
 * Angular used to handle form submission and validation. It contains the form data entered by the user
 * for the login process.
 */
login(loginForm: NgForm){
  this.userService.login(loginForm.value).subscribe(
(response:any)=>{
this.userAuthService.setRoles(response.user.roles);
this.userAuthService.setToken(response.jwtToken);
const role=response.user.roles[0].name;
if (role==='ROLE_RH'){
this.router.navigate(['/rh'])
}else if (role==='ROLE_ADMIN'){ this.router.navigate(['/admin'])}
  else{
  this.router.navigate(['/employee'])
}
},
(error)=>{console.log(error);
  this.message="nom d'utilisateur ou mot de passe incorrecte";
  this.showFailedMessage();

}
);

}

/**
 * The function `showFailedMessage` sets a boolean variable `showFailedAlert` to true, and then after 5
 * seconds, sets it back to false.
 */
showFailedMessage() {
  this.showFailedAlert = true;

  setTimeout(() => {
    this.showFailedAlert = false;
  }, 5000);
}

/**
 * The closeAlert function sets the showFailedAlert variable to false.
 */
closeAlert() {
  this.showFailedAlert = false;
}}
