import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages = 0;
  username = "";
  sortOrder: string = 'asc';
  sortBy;
  constructor(private userService: UserService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }

  ngOnInit(): void {
  }

  /* The `afficher(page, size)` function is responsible for fetching the users from the server based on
  the specified page number, page size, sorting criteria, and search keyword. It calls the
  `userService.afficher()` method and subscribes to the response. The response is then assigned to
  the `users` array and the `numberOfPages` variable is updated based on the total number of pages
  returned from the server. */
  afficher(page, size) {
    this.userService.afficher(this.username, page, size, this.sortBy, this.sortOrder).subscribe(
      (response: any) => {
        console.log(response);
        this.users = response.content;
        this.numberOfPages = response.totalPages - 1;
      },
      error => {
        console.log(error);

      }
    );
  }
  /**
   * The function checks if a given role name exists in an array of roles.
   * @param {any[]} roles - An array of objects representing roles. Each role object should have a "name"
   * property.
   * @param {string} roleName - The `roleName` parameter is a string that represents the name of a role.
   * @returns a boolean value.
   */
  hasRole(roles: any[], roleName: string): boolean {
    return roles.some((role) => role.name === roleName);
  }
  /**
   * The function checks if the given array of roles contains a role with the name 'ROLE_RH' and returns
   * true if it does, otherwise it returns false.
   * @param {any[]} roles - An array of objects representing roles. Each role object has a property
   * called "name" which represents the name of the role.
   * @returns a boolean value. It returns true if there is a role with the name 'ROLE_RH' in the given
   * array of roles, and false otherwise.
   */
  checkRoleRH(roles: any[]): boolean {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'ROLE_RH') {
        return true;
      }
    }
    return false;
  }
  /**
   * The function `rh` calls the `roleRh` method of the `userService` and logs the response or error to
   * the console.
   * @param user - The user parameter is the user object that is being passed to the roleRh method of
   * the userService.
   */
  rh(user) {
    this.userService.roleRh(user).subscribe(
      (response) => {

        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * The function "employee" calls the "roleEmployee" method of the "userService" object and logs the
   * response or error to the console.
   * @param user - The user parameter is an object that represents an employee. It likely contains
   * information such as the employee's name, ID, and other relevant details.
   */

  employee(user) {
    this.userService.roleEmployee(user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * The function `onCheckboxChange` toggles between calling the `rh` and `employee` functions based on
   * the value of the `isChecked` parameter.
   * @param user - The user parameter represents the user object or data that is being passed to the
   * onCheckboxChange function. It could contain information about the user such as their name, ID, or
   * any other relevant details.
   * @param {boolean} isChecked - A boolean value indicating whether the checkbox is checked or not.
   */
  onCheckboxChange(user, isChecked: boolean): void {
    if (isChecked) {
      this.rh(user);
    } else {
      this.employee(user);
    }
  }
  /**
   * The function "supprimer" deletes a user and then calls the "afficher" function to display the
   * updated list of users.
   * @param user - The parameter "user" is an object that represents a user. It likely has properties
   * such as "userId" which is used to identify the user to be deleted.
   */
  supprimer(user) {
    this.userService.supprimer(user.userId).subscribe(
      response => {
        console.log(response);

        this.afficher(this.currentPage, this.itemsPerPage);
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * The function "goToNextPage" increases the value of "currentPage" by 1 and calls the "afficher"
   * function with the updated values of "currentPage" and "itemsPerPage".
   */
  goToNextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.afficher(this.currentPage, this.itemsPerPage);
    }
  }

  /**
   * The function "goToPreviousPage" decreases the value of "currentPage" by 1 and calls the "afficher"
   * function with the updated values of "currentPage" and "itemsPerPage".
   */
  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.afficher(this.currentPage, this.itemsPerPage);
    }
  }

  /**
   * The function generates an array of page numbers based on the total number of pages.
   * @param {number} totalPages - The `totalPages` parameter is the total number of pages in a document
   * or a book.
   * @returns an array of numbers representing the page numbers.
   */
  generatePageNumbers(totalPages: number): number[] {
    const pageNumbers: number[] = [];
    for (let i = 0; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  /**
   * The function "changePage" updates the current page number and calls the "afficher" function with the
   * updated page number and items per page.
   * @param {number} page - The `page` parameter is a number that represents the page number to be
   * displayed.
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  /**
   * The function "changeSize" updates the number of items per page and calls another function to display
   * the updated page.
   * @param event - The event parameter is the event object that is passed when the changeSize function
   * is called. It represents the event that triggered the function, such as a change event on an input
   * element.
   */
  changeSize(event) {
    this.itemsPerPage = event.target.value;
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  /**
   * The search function calls the afficher function with the current page and items per page as
   * parameters.
   */
  search() {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  /**
   * The trie function sorts the data based on a specified criteria and toggles the sort order.
   * @param sortBy - The `sortBy` parameter is used to specify the field by which the items should be
   * sorted. It determines the order in which the items will be displayed.
   */
  trie(sortBy) {
    this.sortBy = sortBy;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.afficher(this.currentPage, this.itemsPerPage);

  }
}

