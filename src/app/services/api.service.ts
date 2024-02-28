import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;
  private token: string = environment.authToken;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/marcas/`, this.httpOptions);
  }

  getBrandById(urlBrand: string): Observable<any> {
    return this.http.get(urlBrand, this.httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/`, this.httpOptions);
  }

  getVehicles(filters: any): Observable<any> {
    let queryParams = '';
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (queryParams !== '') {
          queryParams += '&';
        }
        queryParams += `${key}=${filters[key]}`;
      });
      queryParams = `?${queryParams}`;
    }
    return this.http.get(
      `${this.apiUrl}/vehiculos/${queryParams}`,
      this.httpOptions
    );
  }

  createResource(resourceUrl: string, data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${resourceUrl}/`,
      data,
      this.httpOptions
    );
  }

  updateResource(resourceUrl: string, data: any): Observable<any> {
    return this.http.put(resourceUrl, data, this.httpOptions);
  }

  deleteResource(resourceUrl: string): Observable<any> {
    return this.http.delete(resourceUrl, this.httpOptions);
  }
}
