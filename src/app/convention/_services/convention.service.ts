import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  PATH_OF_API="http://localhost:8084";
  constructor(private httpclient:HttpClient,){}
  public ajouter(ajouterData){
    return this.httpclient.post(this.PATH_OF_API+"/ajouterConvention",ajouterData);
  }
  public afficherList(){
    return this.httpclient.get(this.PATH_OF_API+"/afficherListConvention");
    
  }
  public afficher(name,page, size,sortBy,sortOrder){
    return this.httpclient.get(`${this.PATH_OF_API}/afficherConvention?name=${name}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`);

  }
  public supprimer(id){
    return this.httpclient.delete(this.PATH_OF_API+"/supprimerConvention?id="+id);
  }
  public modifier(convention){  
    return this.httpclient.put(this.PATH_OF_API+"/modifierConvention",convention);
  }
  checkNameUniqueness(name: string) {
    return this.httpclient.get<boolean>(this.PATH_OF_API+'/uniqueName?name='+name);
  }
  checkNameUniquenessUpdate(name: string,id) {
    return this.httpclient.get<boolean>(`${this.PATH_OF_API}/uniqueNameUpdate?name=${name}&conventionId=${id}`);

  }
  checkEmailUniqueness(email: string) {
    return this.httpclient.get<boolean>(this.PATH_OF_API+'/uniqueEmailConvention?email='+email);;
  }
  checkEmailUniquenessUpdate(email: string,id) {
    
    return this.httpclient.get<boolean>(`${this.PATH_OF_API}/uniqueEmailConventionUpdate?email=${email}&conventionId=${id}`);
  }
}
