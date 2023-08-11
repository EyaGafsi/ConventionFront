import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  PATH_OF_API="http://localhost:8084";
  constructor(private httpclient:HttpClient,){}
  public ajouter(requestBody) {   
    return this.httpclient.post(this.PATH_OF_API+"/ajouterDemande", requestBody);
  }

  public afficher(name,page, size,sortBy,sortOrder) {
    return this.httpclient.get(`${this.PATH_OF_API}/demandes?name=${name}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
 }
  public accepter(demande) {
  
    return this.httpclient.post(this.PATH_OF_API+"/accepterDemande",demande);
  }
  public refuser(demande) {
    return this.httpclient.post(this.PATH_OF_API+"/refuserDemande",demande);
  } 
  checkNameUniqueness(name: string) {
    return this.httpclient.get<boolean>(this.PATH_OF_API+'/uniqueNameDemande?name='+name);
  }
  checkEmailUniqueness(email: string) {
    return this.httpclient.get<boolean>(this.PATH_OF_API+'/uniqueEmailDemande?email='+email);;
  }
  public afficherDemandesUser(name,page, size,sortBy,sortOrder) {
    return this.httpclient.get(`${this.PATH_OF_API}/demandesUser?name=${name}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
 }
  
}
