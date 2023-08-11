import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  nouvelAvantage: string = '';
  message;
  showSuccessAlert = false;
  showFailedAlert = false;
  new = {
    demandeId: "",
    nomDemande: "",
    telephone: "",
    adresseDemande: "",
    emailDemande: "",
    beneficiaireDemande: "",
    typeDemande: "",
    objectifDemande: "",
    conditionDemande: "",
    demandeAvantages: []
  }
  demandeForm: FormGroup;

  constructor(private demandeService: DemandeService, private fb: FormBuilder) {
    this.demandeForm = this.fb.group({
      nomDemande: ['', [Validators.required, Validators.maxLength(50)], this.checkNameUniqueness()],
      telephone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      adresseDemande: ['', [Validators.required, Validators.maxLength(50)]],
      emailDemande: ['', [Validators.required, Validators.maxLength(50), Validators.email], this.checkEmailUniqueness()],
      typeDemande: ['', [Validators.required, Validators.maxLength(100)]],
      beneficiaireDemande: ['', [Validators.required, Validators.maxLength(100)]],
      objectifDemande: ['', [Validators.required, Validators.maxLength(100)]],
      conditionDemande: ['', [Validators.required, Validators.maxLength(100)]],
      demandeAvantages: [[]],
      nouvelAvantage: [''],
    });
  }

  ngOnInit(): void {
  }
  /**
   * The function "ajouterAvantage" adds a new advantage to the "demandeAvantages" array in the "new"
   * object and updates the form values accordingly.
   */
  ajouterAvantage(): void {
    const nouvelAvantageValue = this.demandeForm.value.nouvelAvantage;
    if (nouvelAvantageValue && nouvelAvantageValue.trim() !== '') {
      this.new.demandeAvantages.push({ details: nouvelAvantageValue });
      this.demandeForm.patchValue({
        demandeAvantages: this.new.demandeAvantages,
        nouvelAvantage: '',
      });
    }
  }

  /**
   * The function "supprimer" removes an element from an array called "demandeAvantages" in the object
   * "new" if it exists.
   * @param avantage - The parameter "avantage" represents the advantage that you want to remove from the
   * "demandeAvantages" array.
   */
  supprimer(avantage) {
    const index = this.new.demandeAvantages.indexOf(avantage);
    if (index !== -1) {
      this.new.demandeAvantages.splice(index, 1);
    }
  }

  /**
   * The function "ajouter()" is used to add a new demand by calling the "ajouter()" method of the
   * "demandeService" and handling the response and error cases.
   */
  ajouter() {
    if (this.demandeForm.valid) {
      this.demandeService.ajouter(this.demandeForm.value).subscribe(
        response => {
          console.log(response);
          this.message = 'Demande envoyée avec succès';
          this.demandeForm.reset();
          this.new.demandeAvantages = [];
          this.showSuccessMessage();
        },
        error => {
          this.message = "Erreur lors de l'ajout de la demande";
          this.showFailedMessage();

        }
      );
    } else {
      this.message = 'Veuillez corriger les erreurs dans le formulaire.';
      this.showFailedMessage();

    }
  }
  /**
   * The function `checkNameUniqueness` is an async validator that checks if a given name is unique by
   * calling a service method and returning an error if the name is not unique.
   * @returns The function `checkNameUniqueness()` returns an `AsyncValidatorFn` function.
   */
  checkNameUniqueness(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const name = control.value;
      const isNameUnique = await this.demandeService.checkNameUniqueness(name).toPromise();
      return isNameUnique ? null : { nameNotUnique: true };
    };
  }

  /**
   * The function `checkEmailUniqueness` is an async validator function in TypeScript that checks if an
   * email is unique by calling a service method and returns a validation error if the email is not
   * unique.
   * @returns The function `checkEmailUniqueness()` returns an `AsyncValidatorFn` function.
   */
  checkEmailUniqueness(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const email = control.value;
      const isEmailUnique = await this.demandeService.checkEmailUniqueness(email).toPromise();
      return isEmailUnique ? null : { emailNotUnique: true };
    };
  }
  /**
   * The function `showSuccessMessage` displays a success alert for 5 seconds.
   */
  showSuccessMessage() {
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }

  /**
   * The closeAlert function is used to hide success and failed alerts.
   */
  closeAlert() {
    this.showSuccessAlert = false;
    this.showFailedAlert = false;
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
   * The function checks if the "demandeAvantages" array is empty and returns a promise with a validation
   * error if it is, or null if it is not.
   * @returns an AsyncValidatorFn, which is a function that takes an AbstractControl as a parameter and
   * returns a Promise that resolves to either a ValidationErrors object or null.
   */
  emptyAvantages(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const demandeAvantagesArray = control.get('demandeAvantages')?.value;
      if (!demandeAvantagesArray || demandeAvantagesArray.length === 0) {
        return Promise.resolve({ demandeAvantagesEmpty: true });
      }
      return Promise.resolve(null);
    };
  }
}

