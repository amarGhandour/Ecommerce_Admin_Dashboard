import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from "@services/categories.service";
import {ICategory} from "@/interfaces/icategory";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "@components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: ICategory[] = [];

  displayedColumns: string[] = ['image', 'name', 'actions'];
  public dataSource!: MatTableDataSource<ICategory>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  confirmRes: boolean = false;

  constructor(private categoriesService: CategoriesService, private toaster: ToastrService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories() {
    const observer = {
      next: (result: any) => {
        console.log('here')
        this.categories = result.data;
        console.log(result.data)
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    this.categoriesService.getAllCategories().subscribe(observer);
  }

  deleteCategory(id: any) {
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
            this.toaster.success('Category successfully Deleted.');
            this.categories = this.categories.filter((item) => item._id != id);
            this.dataSource = new MatTableDataSource(this.categories);
            this.dataSource.paginator = this.paginator;
          },
          error: (err) => {
            console.log(err)
          }
        }
        this.categoriesService.deleteCategory(id).subscribe(observer);
      }
    });
  }


}


