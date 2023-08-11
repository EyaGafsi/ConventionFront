import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService) {
  }
  /**
   * The canActivate function checks if the user has a valid token and if their role matches the
   * required role for the route, and redirects them accordingly.
   * @param {ActivatedRouteSnapshot} route - The `route` parameter is an instance of
   * `ActivatedRouteSnapshot`, which represents the state of the activated route at a particular moment
   * in time. It contains information about the route's configuration, parameters, and data.
   * @param {RouterStateSnapshot} state - The `state` parameter in the `canActivate` method is of type
   * `RouterStateSnapshot`. It represents the state of the router at the moment when the guard is
   * activated. It contains information about the current URL, query parameters, and other relevant
   * data.
   * @returns The canActivate method returns either an Observable<boolean | UrlTree>, a Promise<boolean
   * | UrlTree>, a boolean, or a UrlTree.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const role = route.data["roles"] as Array<String>;
      if (role) {
        const match = this.userService.roleMatch(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(['accessDenied']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

}
