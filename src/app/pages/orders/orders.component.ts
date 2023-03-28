import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from "@services/orders.service";
import {IOrder} from "@/interfaces/iorder";
import {MatTableDataSource} from "@angular/material/table";
import {ICategory} from "@/interfaces/icategory";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orders!:IOrder[];

  displayedColumns: string[] = ['no', 'name','paymentMethodType', 'totalOrderPrice', 'isDelivered', 'isPaid', 'actions'];
  public dataSource!: MatTableDataSource<IOrder>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    const observer = {
      next: (result) => {
        this.orders = result.data;
        console.log(this.orders)
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    }

    this.ordersService.getAllOrders().subscribe(observer);
  }



}
