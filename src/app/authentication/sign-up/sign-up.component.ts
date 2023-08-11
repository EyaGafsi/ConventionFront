import { Component } from '@angular/core';
import {  AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent {
  signupForm: FormGroup;
  message: string;
  email: string;
  emailChecked: boolean;
  isEmailUnique: boolean;
  showSuccessAlert=false;
  showFailedAlert=false;

  constructor(private fb: FormBuilder,private userService:UserService) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)],this.checkUserNameUniqueness()],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required,Validators.maxLength(50), Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required,Validators.maxLength(50), Validators.email],this.checkEmailUniqueness()],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      confirmPassword: ['', Validators.required],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password === this.signupForm.value.confirmPassword) {
        this.userService.signup(this.signupForm.value).subscribe(
          response => {
            this.message = 'Compte créé avec succès';
            this.signupForm.reset();
            this.showSuccessMessage();
          },
          error => {
            console.log(error);
            this.message = 'Erreur lors de l\'inscription';
           this.showFailedMessage();
          }
        );
      } else {
        this.message = 'le mot de passe et le confirm password doivent être identique.';
        this.showFailedMessage();

      }
    } else {
      this.message = 'Veuillez corriger les erreurs dans le formulaire.';
      this.showFailedMessage();

    }
  }
  
  checkEmailUniqueness(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const email = control.value;
      const isEmailUnique = await this.userService.checkEmailUniqueness(email).toPromise();
      return isEmailUnique ? null : { emailNotUnique: true };
    };
  }
  checkUserNameUniqueness(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const userName = control.value;
      const isUserNameUnique = await this.userService.checkUserNameUniqueness(userName).toPromise();
      return isUserNameUnique ? null : { userNameNotUnique: true };
    };
  }

  showSuccessMessage() {
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showFailedAlert = false;
    this.showSuccessAlert = false;
  }
  showFailedMessage() {
    this.showFailedAlert = true;

    setTimeout(() => {
      this.showFailedAlert = false;
    }, 5000);
  }


}