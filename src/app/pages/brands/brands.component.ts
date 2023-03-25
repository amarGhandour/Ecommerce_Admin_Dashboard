import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog} from '@angular/material/dialog';

import {BrandService} from '@services/brand.service';
import {IBrand} from '@/interfaces/ibrand';
import {Router} from '@angular/router';
import {DeleteBrandComponent} from './delete-brand/delete-brand.component';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource!: MatTableDataSource<IBrand>;
  displayedColumns: string[] = ['#', 'name', 'Operations'];
  brands: IBrand[];
    constructor(
        public brandSer: BrandService,
        public r: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getAllBrands();
    }

    //for filtering the table
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    // getting data from server
    getAllBrands() {
        const observer = {
            next: (result: any) => {
                this.brands = result.data;
                console.log(this.brands);
                this.dataSource = new MatTableDataSource(this.brands);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err: any) => {
                console.log(err);
            }
        };
        this.brandSer.getAllBrands().subscribe(observer);
    }
    openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        id: number
    ): void {
        this.dialog.open(DeleteBrandComponent, {
            width: '500px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {
                key: id
            }
        });
    }
}
