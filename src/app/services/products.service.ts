import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new Headers()
    }
  }

  getAllProducts() {
    return this.httpClient.get(`${environment.apiUrl}/products`, this.httpOptions);
  }

  addProduct(formData: any) {
    return this.httpClient.post(`${environment.apiUrl}/products`, formData, this.httpOptions);
  }
}
