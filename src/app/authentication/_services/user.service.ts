import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API="http://localhost:8084";
  requestHeader=new HttpHeaders(
{"No-Auth":"True"}
  );
  constructor(private httpclient:HttpClient,
    private userAuthService: UserAuthService) { }
  public login(loginData){
    return this.httpclient.post(this.PATH_OF_API+"/authenticate",loginData,{headers:this.requestHeader});
  }

  public roleMatch(allowedRoles):boolean{
   const userRoles :any=this.userAuthService.getRoles();
  if(userRoles!=null && userRoles)
  {
    for(let i=0;i<userRoles.length;i++){
      for(let j=0;j<allowedRoles.length;j++){
        if(userRoles[i].name===allowedRoles[j]){
          return true;
        }else{
          return false;
        }
      }
    }
  }
  }
  public signup(signupData){
    return this.httpclient.post(this.PATH_OF_API+"/registerNewUser",signupData,{headers:this.requestHeader});
  }
   
 checkEmailUniqueness(email: string) {
  return this.httpclient.get<boolean>(this.PATH_OF_API+'/uniqueEmail?email='+email,{headers:this.requestHeader});
}
checkUserNameUniqueness(userName: string) {
  return this.httpclient.get<boolean>(this.PATH_OF_API+'/uniqueUserName?userName='+userName,{headers:this.requestHeader});
}
 

}
