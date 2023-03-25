import {Component, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "@/interfaces/iproduct";
import {ProductsService} from "@services/products.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];

  public dataSource: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['image', 'title', 'price', 'category', 'rating', 'actions'];

  constructor(private productsService: ProductsService,) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    const observer = {
      next: (result: any) => {
        this.products = result.data;
        this.dataSource = new MatTableDataSource<IProduct>(this.products);
        this.dataSource.paginator = this.paginator;
        console.log(this.products);
      },
      error: (err: any) => {
        console.log("error happened")
        console.log(err);
      }
    }

    this.productsService.getAllProducts().subscribe(observer);
  }

  deleteCategory(_id: any) {

  }
}
