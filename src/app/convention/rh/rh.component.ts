import { Component, OnInit ,ElementRef} from '@angular/core';
import { ConventionService } from '../_services/convention.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})
export class RhComponent implements OnInit {
  message;
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages = 0;
  name = "";
  conventionForm: FormGroup;
  updateForm: FormGroup;
  sortOrder: string = 'asc';
  sortBy = "";
  nouvelAvantage: string = '';
  convention: null;
  conventions = {
    conventionId: "",
    nomConvention: "",
    telephone: "",
    adresseConvention: "",
    email: "",
    beneficiaireConvention: "",
    typeConvention: "",
    objectifConvention: "",
    conditionConvention: "",
    avantages: []

  }
  showSuccessAlert = false;
  showFailedAlert=false;
  constructor(private conventionService: ConventionService, private elementRef: ElementRef,private fb: FormBuilder) {
    this.afficher(this.currentPage, this.itemsPerPage);
    this.conventionForm = this.fb.group({
      nomConvention: ['', [Validators.required, Validators.maxLength(50)], this.checkNameUniqueness()],
      adresseConvention: ['', [Validators.required, Validators.maxLength(50)]],
      telephone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email], this.checkEmailUniqueness()],
      typeConvention: ['', [Validators.required, Validators.maxLength(100)]],
      beneficiaireConvention: ['', [Validators.required, Validators.maxLength(100)]],
      objectifConvention: ['', [Validators.required, Validators.maxLength(100)]],
      conditionConvention: ['', [Validators.required, Validators.maxLength(100)]],
      avantages: [[]],
      nouvelAvantage: [''],
    });
    this.updateForm = this.fb.group({
      conventionId: [''],
      nomConvention: ['', [Validators.required, Validators.maxLength(50)], this.checkNameUniquenessUpdate()],
      adresseConvention: ['', [Validators.required, Validators.maxLength(50)]],
      telephone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email], this.checkEmailUniquenessUpdate()],
      typeConvention: ['', [Validators.required, Validators.maxLength(100)]],
      beneficiaireConvention: ['', [Validators.required, Validators.maxLength(100)]],
      objectifConvention: ['', [Validators.required, Validators.maxLength(100)]],
      conditionConvention: ['', [Validators.required, Validators.maxLength(100)]],
      avantages: [[]],
      nouvelAvantage: [''],
    });

  }
  ngOnInit(): void {
  }
  /**
   * The function "ajouterAvantage" adds a new advantage to a list of existing advantages in a form.
   */
  ajouterAvantage(): void {
    const nouvelAvantageValue = this.conventionForm.value.nouvelAvantage;
    if (nouvelAvantageValue && nouvelAvantageValue.trim() !== '') {
      this.conventions.avantages.push({ details: nouvelAvantageValue });
  
      this.conventionForm.patchValue({
        avantages: this.conventions.avantages,
        nouvelAvantage:'',
      });
    }
  }
  ajouterAvantageUpdate(): void {
    const nouvelAvantageValue = this.updateForm.value.nouvelAvantage;
    if (nouvelAvantageValue && nouvelAvantageValue.trim() !== '') {
      this.conventions.avantages.push({ details: nouvelAvantageValue });
      this.updateForm.patchValue({
        avantages: this.conventions.avantages,
        nouvelAvantage:'',
      });
    }
  }

  supprimerAvantage(avantage: any) {
    const index = this.conventions.avantages.indexOf(avantage);
    if (index !== -1) {
      this.conventions.avantages.splice(index, 1);
    }
  }

  ajouter() {
    if (this.conventionForm.valid) {
      this.conventionService.ajouter(this.conventionForm.value).subscribe(
        response => {
          console.log(response);
          this.afficher(this.currentPage, this.itemsPerPage);
          this.message = 'Convention ajoutée avec succès';
          this.showSuccessMessage();
          this.conventions.avantages=[];

        },
        error => {
          this.message = 'Erreur lors de l\'ajout de la convention';
          console.log(error);

        }
      );
    } else {
      this.message = 'Veuillez corriger les erreurs dans le formulaire.';
      this.showFailedMessage();

    }
  }
  afficher(page, size) {
    this.conventionService.afficher(this.name, page, size, this.sortBy, this.sortOrder).subscribe(
      (response: any) => {
        console.log(response);
        this.convention = response.content;
        this.numberOfPages = response.totalPages - 1;
      },
      error => {
        console.log(error);

      }
    );
  }

  supprimer(convention) {
    this.conventionService.supprimer(convention.conventionId).subscribe(
      response => {
        console.log(response);
        this.afficher(this.currentPage, this.itemsPerPage);
        this.message = 'Convention supprimé avec succès';
        this.showSuccessMessage();
      },
      error => {
        console.log(error);
      }
    );
  }
  edit(convention) {
    this.updateForm.patchValue(convention); 
    this.conventions=convention;
    this.message = "";
    
  }
  details(convention) {
    this.conventions = convention;
  }
  modifier() {
    
    if (this.updateForm.valid) {

    this.conventionService.modifier(this.updateForm.value).subscribe(
      response => {
        console.log(this.updateForm.value);
        this.message = 'convention modifié avec succées';
        this.afficher(this.currentPage, this.itemsPerPage);
        this.showSuccessMessage();
        console.log(response);
     
      },
      error => {
        console.log(error);
      }
    );
  }else {
    this.message = 'Veuillez corriger les erreurs dans le formulaire.';
  this.showFailedMessage();

  }
}

  openAjouterForm() {
    this.message = "";
       this.conventions.avantages=[];
        this.updateForm.reset(); 
  }

  goToNextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.afficher(this.currentPage, this.itemsPerPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.afficher(this.currentPage, this.itemsPerPage);
    }
  }

  generatePageNumbers(totalPages: number): number[] {
    const pageNumbers: number[] = [];
    for (let i = 0; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  changeSize(event) {
    this.itemsPerPage = event.target.value;
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  search() {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  trie(sortBy) {
    this.sortBy = sortBy;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.afficher(this.currentPage, this.itemsPerPage);

  }
  onSortByChange(event: any) {
    this.sortBy = event.target.value;
    this.afficher(this.currentPage, this.itemsPerPage);
  }

  showSuccessMessage() {
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }
  showFailedMessage() {
    this.showFailedAlert = true;
    setTimeout(() => {
      this.showFailedAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showSuccessAlert = false;
    this.showFailedAlert = false;

  }
  checkNameUniquenessUpdate(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const name = control.value;
      const isNameUnique = await this.conventionService.checkNameUniquenessUpdate(name,this.updateForm.get('conventionId').value).toPromise();
      return isNameUnique ? null : { nameNotUnique: true };
    };
  }
  checkNameUniqueness(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const name = control.value;
      const isNameUnique = await this.conventionService.checkNameUniqueness(name).toPromise();
      return isNameUnique ? null : { nameNotUnique: true };
    };
  }
  checkEmailUniquenessUpdate(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const email = control.value;
      const isEmailUnique = await this.conventionService.checkEmailUniquenessUpdate(email,this.updateForm.get('conventionId').value).toPromise();  
      return isEmailUnique ? null : { emailNotUnique: true };
    };
  }
  checkEmailUniqueness(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const email = control.value;
      const isEmailUnique = await this.conventionService.checkEmailUniqueness(email).toPromise();
      return isEmailUnique ? null : { emailNotUnique: true };
    };
  }

}

