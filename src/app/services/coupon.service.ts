import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CouponService {
    private httpOptions: any;

    constructor(private httpClient: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({})
        };
    }
    getAllCoupons() {
        return this.httpClient.get(`${environment.apiUrl}/coupons`);
    }
    deleteCoupon(id: any) {
        return this.httpClient.delete(`${environment.apiUrl}/coupons/${id}`);
    }
    addCoupon(body: any) {
        return this.httpClient.post(
            `${environment.apiUrl}/coupons`,
            body,
            this.httpOptions
        );
    }
    couponDetails(id: any) {
        return this.httpClient.get(`${environment.apiUrl}/coupons/${id}`);
    }
    updateCoupon(body: any, id: any) {
        return this.httpClient.put(
            `${environment.apiUrl}/coupons/${id}`,
            body,
            this.httpOptions
        );
    }
}
