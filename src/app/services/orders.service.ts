import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IOrder} from "@/interfaces/iorder";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  httpOptions: any;


  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new Headers({
      })
    }
  }

  getAllOrders() {
    return this.httpClient.get(`${environment.apiUrl}/orders`, this.httpOptions);
  }

  getOrderById(id:string){
    return this.httpClient.get(`${environment.apiUrl}/orders/${id}`)
  }

  makeOrderPaid(id:string){
    return this.httpClient.put(`${environment.apiUrl}/orders/${id}/pay`, null, this.httpOptions)
  }

  makeOrderDelivered(id:string){
    return this.httpClient.put(`${environment.apiUrl}/orders/${id}/deliver`, null, this.httpOptions)
  }
}
