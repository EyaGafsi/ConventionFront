import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/demande_convention/_services/demande.service';

@Component({
  selector: 'app-demande-user',
  templateUrl: './demande-user.component.html',
  styleUrls: ['./demande-user.component.css']
})
export class DemandeUserComponent implements OnInit {

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
    status:"",
    demandeAvantages:[]
  
  }  
  constructor(private demandeService: DemandeService) { this.afficher(this.currentPage,this.itemsPerPage)}

  ngOnInit(): void {
  }

  /**
   * The function "afficher" retrieves and displays a list of demands for a specific user, with
   * pagination and sorting options.
   * @param page - The page parameter is used to specify the page number of the data to be displayed.
   * It determines which set of data will be retrieved from the server.
   * @param size - The "size" parameter is used to specify the number of items to be displayed per
   * page. It determines the size of each page in the pagination.
   */
  afficher(page,size) {
    this.demandeService.afficherDemandesUser(this.name,page,size,this.sortBy,this.sortOrder).subscribe(
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
 * The function "goToNextPage" increases the value of "currentPage" by 1 and calls the "afficher"
 * function with the updated "currentPage" value and "itemsPerPage" as arguments, if the current page
 * is less than the total number of pages.
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
 * The function generates an array of page numbers from 0 to the specified total number of pages.
 * @param {number} totalPages - The `totalPages` parameter is the total number of pages in a document
 * or a book.
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
   * The function changes the current page and calls a method to display the updated page.
   * @param {number} page - The `page` parameter is a number that represents the page number to be set.
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.afficher(this.currentPage,this.itemsPerPage);
  }
 /**
  * The function "changeSize" updates the number of items per page and calls another function to
  * display the updated page.
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
 * The trie function is used to sort and display data based on a specified sorting order.
 * @param sortBy - The `sortBy` parameter is used to specify the field by which the data should be
 * sorted. It determines the order in which the data will be displayed.
 */
  trie(sortBy){
    this.sortBy=sortBy;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.afficher(this.currentPage,this.itemsPerPage);
  }
/**
 * The onSortByChange function updates the sortBy property based on the value selected in the event
 * target and then calls the afficher function with the current page and items per page.
 * @param {any} event - The event parameter is an object that represents the event that triggered the
 * change. It contains information about the event, such as the target element that triggered the
 * event. In this case, it is used to get the value of the element that triggered the change event.
 */
  onSortByChange(event: any) {
    this.sortBy = event.target.value; 
    this.afficher(this.currentPage,this.itemsPerPage);
  
  }
}
