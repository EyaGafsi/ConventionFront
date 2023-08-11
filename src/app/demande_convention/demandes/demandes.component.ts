import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/demande_convention/_services/demande.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages=0;
  name="";
  sortOrder: string = 'asc';
  sortBy="";  
  demandes=null;
  conventions={
    conventionId:"",
    nomDemande:"",
    telephone:"",
    adresseDemande:"",
    emailDemande:"",
    beneficiaireDemande:"",
    typeDemande:"",
    objectifDemande:"",
    conditionDemande:"",
    dateEnvoi:"",
    demandeAvantages:[]
  
  }  
  constructor(private demandeService: DemandeService) { this.afficher(this.currentPage,this.itemsPerPage)}

  ngOnInit(): void {
  }

/**
 * The function "afficher" retrieves data from a service and assigns it to variables, while also
 * handling any errors that may occur.
 * @param page - The page parameter is used to specify the page number of the data you want to display.
 * It is typically an integer value.
 * @param size - The "size" parameter is used to specify the number of items to be displayed per page.
 * It determines the size of each page in the pagination.
 */
  afficher(page,size) {
    this.demandeService.afficher(this.name,page,size,this.sortBy,this.sortOrder).subscribe(
      (response:any) => {
        console.log(response);     
        this.demandes=response.content;
        this.numberOfPages=response.totalPages-1;  
      },
      error => {
        console.log(error);

      }
    );
}

details(demande) {
  this.conventions=demande;
} 
/**
 * The accepter function accepts a demande and calls the accepter method of demandeService, then logs
 * the response and calls the afficher method with the current page and items per page.
 * @param demande - The parameter "demande" is an object representing a request or a demand. It is
 * passed to the "accepter" function as an argument.
 */
accepter(demande) {  
  this.demandeService.accepter(demande).subscribe(
    response => {
      console.log(response);
      this.afficher(this.currentPage,this.itemsPerPage);     
    },
    error => {    

      console.log(error);

    }
  );
}
/**
 * The refuser function in TypeScript sends a request to the demandeService to reject a demande, and
 * then logs the response and calls the afficher function to display the updated data.
 * @param demande - The parameter "demande" is an object representing a request or demand. It is passed
 * to the "refuser" function as an argument.
 */
refuser(demande) {  
  this.demandeService.refuser(demande).subscribe(
    response => {
      console.log(response);
      this.afficher(this.currentPage,this.itemsPerPage);     
    },
    error => {    

      console.log(error);

    }
  );
}
/**
 * The function "goToNextPage" increases the value of "currentPage" by 1 and calls the "afficher"
 * function with the updated "currentPage" value.
 */
goToNextPage() {
  if (this.currentPage <this.numberOfPages) {
  this.currentPage++;
  this.afficher(this.currentPage,this.itemsPerPage);}
}

/**
 * The function "goToPreviousPage" decreases the value of "currentPage" by 1 and calls the "afficher"
 * function with the updated "currentPage" value.
 */
goToPreviousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.afficher(this.currentPage,this.itemsPerPage);
  }
}
/**
 * The function generates an array of page numbers based on the total number of pages.
 * @param {number} totalPages - The parameter "totalPages" represents the total number of pages in a
 * document or a book.
 * @returns an array of page numbers.
 */
generatePageNumbers(totalPages: number): number[] {
  const pageNumbers: number[] = [];
  for (let i = 0; i <= totalPages; i++) {
    pageNumbers.push(i ); // Ajouter 1 pour décaler le début de 0 à 1
  }
  return pageNumbers;
}
/**
 * The function changes the current page and calls another function to display the updated page.
 * @param {number} page - The `page` parameter is a number that represents the page number to be set.
 */
changePage(page: number): void {
  this.currentPage = page;
  this.afficher(this.currentPage,this.itemsPerPage);
}
/**
 * The function "changeSize" updates the number of items per page and calls another function to display
 * the updated page.
 * @param event - The event parameter is the event object that is passed when the changeSize function
 * is called. It represents the event that triggered the function, such as a change event on an input
 * element.
 */
changeSize(event){
  this.itemsPerPage=event.target.value;
  this.afficher(this.currentPage,this.itemsPerPage);
}
/**
 * The search function calls the afficher function with the current page and items per page as
 * parameters.
 */
search(){
  this.afficher(this.currentPage,this.itemsPerPage);
}
/**
 * The trie function toggles the sort order and calls the afficher function with the current page and
 * items per page.
 * @param sortBy - The `sortBy` parameter is used to specify the field by which the data should be
 * sorted. It determines the property or attribute of the data that will be used as the sorting
 * criteria.
 */
trie(sortBy){
  this.sortBy=sortBy;
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  this.afficher(this.currentPage,this.itemsPerPage);

}
/**
 * The function updates the value of the "sortBy" variable and calls another function to display the
 * data accordingly.
 * @param {any} event - The event parameter is an object that represents the event that triggered the
 * function. In this case, it is likely an event object that is generated when the user selects an
 * option from a dropdown menu.
 */
onSortByChange(event: any) {
  this.sortBy = event.target.value; 
  this.afficher(this.currentPage,this.itemsPerPage);

}
}