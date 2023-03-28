import {Component, OnInit} from '@angular/core';
import {OrdersService} from "@services/orders.service";
import {IOrder} from "@/interfaces/iorder";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order!: IOrder;
  paid: any = "";
  delivered: any = "";

  constructor(private ordersService: OrdersService, private toaster: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
      this.getOrderDetails();
  }

  getOrderDetails() {
    const observer = {
      next: (result) => {
        this.order = result.data;
      },
      error: (err) => {
        console.log(err)
      }
    }
    this.ordersService.getOrderById(this.activatedRoute.snapshot.params['id']).subscribe(observer);
  }

  makePaid() {
    const observer = {
      next: (result) => {
        this.toaster.success("Order successfully upadted.")
      },
      error: (err) => {
        console.log(err)
      }
    }
    this.ordersService.makeOrderPaid(this.activatedRoute.snapshot.params['id']).subscribe(observer);
  }

  makeDelivered() {
    const observer = {
      next: (result) => {
        this.toaster.success("Order successfully upadted.")
      },
      error: (err) => {
        console.log(err)
      }
    }
    this.ordersService.makeOrderDelivered(this.activatedRoute.snapshot.params['id']).subscribe(observer);
  }
}
