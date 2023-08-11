import { Component ,OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../authentication/_services/user.service';
import * as myScript from '../../../assets/script/script.js';
import { UserAuthService } from '../../authentication/_services/user-auth.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 notif=[];
 notifNumber;
 number;
 isOnEmployeePage: boolean = false;

  constructor(private userAuthService: UserAuthService,
    private router:Router,private notificationService:NotificationService,
    public userService : UserService){ this.notif=this.notificationService.getNotifications();this.notifNumber=this.notificationService.getNotificationNumber();
    }
  ngOnInit(): void {    this.notificationService.getNotificationsObservable().subscribe(
    (notifications) => {
      this.notif = notifications;
    }
  );

  this.notificationService.getNotificationNumberObservable().subscribe(
    (notificationNumber) => {
      this.notifNumber = notificationNumber;
    });
   myScript;
   this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.isOnEmployeePage = this.router.url === '/employee';
    }
  });
  }
/**
 * The function checks if the user is logged in by calling the isLoggedIn() method of the
 * userAuthService.
 * @returns The return value of the isLoggedIn() function is the result of the isLoggedIn() method of
 * the userAuthService object.
 */
public isLoggedIn(){
  return this.userAuthService.isLoggedIn(); 
}
/**
 * The logout function clears the user authentication and navigates to the home page.
 */
public logout(){
  this.userAuthService.clear();
  this.router.navigate(['/']);
}
/**
 * The function checks if the current page is the login page.
 * @returns A boolean value is being returned.
 */
isLoginPage(): boolean {
  return this.router.url === '/login';
}
/**
 * The function updates the notification number and resets it to zero.
 */
noticationNumber(){
  this.number=this.notifNumber;
  this.notificationService.resetNotificationNumber();
}
}
