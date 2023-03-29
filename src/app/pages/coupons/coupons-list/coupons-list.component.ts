import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Icoupon} from '@/interfaces/icoupon';
import {Router} from '@angular/router';
import {CouponService} from '@services/coupon.service';
import {DeleteCouponComponent} from '../delete-coupon/delete-coupon.component';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-coupons-list',
    templateUrl: './coupons-list.component.html',
    styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    public dataSource!: MatTableDataSource<Icoupon>;
    displayedColumns: string[] = [
        'Name',
        'Expire Date',
        'Discount',
        'operation'
    ];
    coupons: Icoupon[];
    constructor(
        public couponSer: CouponService,
        public r: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getAllCoupons();
    }
    getAllCoupons() {
        const observer = {
            next: (result: any) => {
                this.coupons = result.data;
                console.log(this.coupons);
                this.dataSource = new MatTableDataSource(this.coupons);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err: any) => {
                console.log(err);
            }
        };
        this.couponSer.getAllCoupons().subscribe(observer);
    }
    //for filtering the table
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        id: number
    ): void {
        this.dialog.open(DeleteCouponComponent, {
            width: '500px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {
                key: id
            }
        });
    }
  formatDate(date) {
    return DateTime.fromISO(date).toFormat('dd LLL yyyy');
  }


}
