import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  message: string = '';
  contactForm: FormGroup;
  showSuccessAlert=false;
  showFailedAlert=false;
  constructor(private formBuilder: FormBuilder,private homeService:HomeService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  submitForm() {

    if (this.contactForm.valid) {

    this.homeService.contactUs(this.contactForm.value).subscribe(
      response => {
console.log(response);
this.contactForm.reset();
this.message = 'Message envoyé avec succès';
this.showSuccessMessage();
      },
      error => {
        console.log(error);

      }
    );
  } else {
    this.message = 'Veuillez corriger les erreurs dans le formulaire.';
    this.showFailedMessage();

  }}

  showSuccessMessage() {
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showSuccessAlert = false;
    this.showFailedAlert=false;
  }
  showFailedMessage() {
    this.showFailedAlert = true;

    setTimeout(() => {
      this.showFailedAlert = false;
    }, 5000);
  }

}
