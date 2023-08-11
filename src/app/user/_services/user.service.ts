import { Injectable } from '@angular/core';
import { UserAuthService } from 'src/app/authentication/_services/user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API="http://localhost:8084";
  requestHeader=new HttpHeaders(
{"No-Auth":"True"}
  );
  constructor(private httpclient:HttpClient) { }
  public afficher(username,page, size,sortBy,sortOrder) {
    return this.httpclient.get(`${this.PATH_OF_API}/afficherUser?username=${username}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
 }
 public roleRh(user){
   return this.httpclient.post(this.PATH_OF_API+"/roleRh",user);
 }
 public roleEmployee(user){
   return this.httpclient.post(this.PATH_OF_API+"/roleEmployee",user);
 }
 public supprimer(id){
   return this.httpclient.delete(this.PATH_OF_API+"/supprimerUser?id="+id);
 }

}
