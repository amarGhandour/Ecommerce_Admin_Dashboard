import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {Router} from '@angular/router';
import {CouponService} from '@services/coupon.service';

@Component({
    selector: 'app-delete-coupon',
    templateUrl: './delete-coupon.component.html',
    styleUrls: ['./delete-coupon.component.scss']
})
export class DeleteCouponComponent implements OnInit {
    constructor(
        public couponSer: CouponService,
        @Inject(MAT_DIALOG_DATA) public data: any,

        public r: Router
    ) {}
    public key: number = 0;
    ngOnInit() {
        // will log the entire data object
        console.log(this.data.key);
    }

    delete() {
        const observer = {
            next: (result: any) => {
                console.log(result);
            },
            error: (err: any) => {
                console.log(err);
            }
        };
        this.couponSer.deleteCoupon(this.data.key).subscribe(observer);
        this.r.navigateByUrl('/coupons');
    }
}
