import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public urlUsers : string = `${environment.apiUrl}/users/`
  public token : string = environment.authToken
  constructor( private http: HttpClient) { }

  getUsers(): Observable<any>{ /* TODO: CAMBIAR OBSERVABLE */ 

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };


  

   return this.http.get(this.urlUsers , httpOptions)
  }

}
