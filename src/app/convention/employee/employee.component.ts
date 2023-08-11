import { Component, OnInit } from '@angular/core';
import { ConventionService } from 'src/app/convention/_services/convention.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  conventions=null;
  currentIndex = 0;


  constructor(private conventionService:ConventionService) {     this.afficher();
  }
  ngOnInit(): void {

  }
/**
 * The function "afficher()" retrieves a list of conventions from a service and logs the response to
 * the console.
 */
  afficher() {
    this.conventionService.afficherList().subscribe(
      response => {
        console.log(response);
        this.conventions=response;
        
      },
      error => {
        console.log(error);

      }
    );
  } 
/**
 * The moveNext function updates the currentIndex property to the next index in the conventions array,
 * looping back to the beginning if the end is reached.
 */
  moveNext() {
    this.currentIndex = (this.currentIndex + 1) % this.conventions.length;
  }

/**
 * The movePrev function updates the currentIndex property to the previous index in the conventions
 * array, taking into account the array length.
 */
  movePrev() {
    this.currentIndex = (this.currentIndex - 1 + this.conventions.length) % this.conventions.length;
  }
}
