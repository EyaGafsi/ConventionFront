import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  PATH_OF_API="http://localhost:8084";
  requestHeader=new HttpHeaders(
{"No-Auth":"True"}
  );
  constructor(private httpclient:HttpClient,
   ) { }
  contactUs(contactData) {
    return this.httpclient.post(this.PATH_OF_API+'/contact',contactData,{headers:this.requestHeader});
  }
}
