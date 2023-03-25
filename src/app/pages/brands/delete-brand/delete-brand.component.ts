import {Component, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {BrandService} from '@services/brand.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-delete-brand',
    templateUrl: './delete-brand.component.html',
    styleUrls: ['./delete-brand.component.scss']
})
export class DeleteBrandComponent implements OnInit {
    constructor(
        public brandSer: BrandService,
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
        this.brandSer.deleteBrand(this.data.key).subscribe(observer);
        this.r.navigateByUrl('/brands');
    }
}
