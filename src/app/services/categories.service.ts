import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAllCategories() {
    return this.httpClient.get(`${environment.apiUrl}/categories`);
  }

  createCategory(body: any) {
    return this.httpClient.post(`${environment.apiUrl}/categories`, body, this.httpOptions);
  }

}
