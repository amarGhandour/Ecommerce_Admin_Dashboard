import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import FormData from 'form-data';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CouponService} from '@services/coupon.service';

@Component({
    selector: 'app-add-coupon',
    templateUrl: './add-coupon.component.html',
    styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent {
    c: any;
    createCouponForm: FormGroup;
    errors: any = {};
    constructor(
        private couponSer: CouponService,
        private fb: FormBuilder,
        private toaster: ToastrService,
        private router: Router
    ) {
        this.c = new Date().toISOString().split('T')[0];
        this.createCouponForm = fb.group({
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
        return this.createCouponForm.get('name');
    }
    get expire() {
        return this.createCouponForm.get('expire');
    }
    get discount() {
        return this.createCouponForm.get('discount');
    }
    createCouponSubmit() {
        if (this.createCouponForm.invalid) return;
        console.log('created');
        const observer = {
            next: (result) => {
                this.router.navigate(['/coupons']);
                this.toaster.success('coupon successfuly created.');
            },
            error: (err) => {
                console.log(err);
            }
        };

        this.couponSer
            .addCoupon(this.createCouponForm.value)
            .subscribe(observer);
    }
}
