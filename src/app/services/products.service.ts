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

  getProductById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}/products/${id}`, this.httpOptions);
  }

  addProduct(formData: any) {
    return this.httpClient.post(`${environment.apiUrl}/products`, formData, this.httpOptions);
  }

  updateProduct(formData: any, id: string) {
    return this.httpClient.put(`${environment.apiUrl}/products/${id}`, formData, this.httpOptions);
  }

  deleteProduct(id: any) {
    return this.httpClient.delete(`${environment.apiUrl}/products/${id}`, this.httpOptions);

  }
}
