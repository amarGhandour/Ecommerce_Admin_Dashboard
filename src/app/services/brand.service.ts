import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ibrand} from '@/interfaces/ibrand';

@Injectable({
    providedIn: 'root'
})
export class BrandService {
    private httpOptions: any;

    constructor(private httpClient: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    getAllBrands() {
        return this.httpClient.get(`${environment.apiUrl}/brands`);
    }
    getBrandDetails(id: any) {
        return this.httpClient.get(`${environment.apiUrl}/brands/${id}`);
    }
    addBrand(brand: any) {
        return this.httpClient.post(
            `${environment.apiUrl}/brands`,
            brand,
            this.httpOptions
        );
    }
    deleteBrand(id: any) {
        return this.httpClient.delete(`${environment.apiUrl}/brands/${id}`);
    }
    getBrandByID(id: any) {
        return this.httpClient.get(
            `${environment.apiUrl}/brands/${id}`,
            this.httpOptions
        );
    }
    editBrand(body: any, id: any) {
        return this.httpClient.put(
            `${environment.apiUrl}/brands/${id}`,
            body,
            this.httpOptions
        );
    }
}
