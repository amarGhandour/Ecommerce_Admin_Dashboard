import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new Headers()
    }
  }

  getAllBrands() {
    return this.httpClient.get(`${environment.apiUrl}/brands`, this.httpOptions);
  }
}
