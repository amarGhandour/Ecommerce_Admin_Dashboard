import {Component, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "@/interfaces/iproduct";
import {ProductsService} from "@services/products.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "@components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];

  confirmRes: boolean;
  public dataSource: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['image', 'title', 'price', 'category', 'rating', 'actions'];

  constructor(private productsService: ProductsService, private dialog: MatDialog, private toaster: ToastrService) {

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

  deleteProduct(id: any) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmRes = dialogResult;
      if (this.confirmRes) {
        const observer = {
          next: (result) => {
            this.toaster.success('Product successfully Deleted.');
            this.products = this.products.filter((item) => item._id != id);
            this.dataSource = new MatTableDataSource(this.products);
            this.dataSource.paginator = this.paginator;
          },
          error: (err) => {
            console.log(err)
          }
        }
        this.productsService.deleteProduct(id).subscribe(observer);
      }
    });
  }

}
