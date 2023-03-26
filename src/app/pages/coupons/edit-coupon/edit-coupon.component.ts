import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CouponService} from '@services/coupon.service';
import {Icoupon} from '@/interfaces/icoupon';

@Component({
    selector: 'app-edit-coupon',
    templateUrl: './edit-coupon.component.html',
    styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {
    c: any;
    editFormElm: FormGroup;
    errors: any = {};
    coupon: Icoupon;
    constructor(
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private couponSer: CouponService
    ) {
        this.c = new Date().toISOString().split('T')[0];
        this.editFormElm = fb.group({
            name: ['', Validators.required],
            expire: ['', [Validators.required]],
            discount: [
                '',
                [
                    Validators.required,
                    Validators.pattern(`^[5-9]{1}[0-9]{1}$|^[1-4][0-9]{2}$`)
                ]
            ]
        });
    }
    get name() {
        return this.editFormElm.get('name');
    }
    get expire() {
        return this.editFormElm.get('expire');
    }
    get discount() {
        return this.editFormElm.get('discount');
    }
    ngOnInit(): void {
        this.getCouponDetails();
    }
    private getCouponDetails() {
        const observer = {
            next: (result) => {
                this.coupon = result.data;
                console.log(this.coupon);
                this.fillFormFields();
            },
            error: (err) => {
                console.log(err);
            }
        };

        this.couponSer
            .couponDetails(this.activeRoute.snapshot.params['id'])
            .subscribe(observer);
    }
    private fillFormFields() {
        this.name.setValue(this.coupon.name);
        this.discount.setValue(this.coupon.discount);
    }
    editCouponSubmit() {
        if (this.editFormElm.invalid) return;
        const observer = {
            next: (result: any) => {
                this.router.navigate(['/coupons']);
                this.toaster.success('coupon successfully updated.');
            },
            error: (err) => {
                console.log(err);
            }
        };

        this.couponSer
            .updateCoupon(this.editFormElm.value, this.coupon._id)
            .subscribe(observer);
    }
}
