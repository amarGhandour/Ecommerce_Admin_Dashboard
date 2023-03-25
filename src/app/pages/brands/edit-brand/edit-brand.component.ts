import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BrandService} from '@services/brand.service';
import {IBrand} from "@/interfaces/ibrand";

@Component({
    selector: 'app-edit-brand',
    templateUrl: './edit-brand.component.html',
    styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  editFormElm: FormGroup;
  brand: IBrand;
  brandImgSrc: any = null;
    errors: any = {};
    file: any = null;

    constructor(
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private brandSer: BrandService,
        private activeRoute: ActivatedRoute,
        public dialog: MatDialog
    ) {
        this.editFormElm = fb.group({
            name: ['', Validators.required],
            image: [null]
        });
    }
    get name() {
        return this.editFormElm.get('name');
    }

    get image() {
        return this.editFormElm.get('image');
    }

    ngOnInit(): void {
        this.getCategoryDetails();
    }

    editBrandSubmit() {
        if (this.editFormElm.invalid) return;
        const formData = new FormData();
        if (this.file) formData.append('image', this.file, this.file?.name);
        formData.append('name', this.name.value);

        const observer = {
            next: (result: any) => {
                this.router.navigate(['/brands']);
                this.toaster.success('brand successfully updated.');
            },
            error: (err) => {
                console.log(err);
            }
        };

        this.brandSer.editBrand(formData, this.brand._id).subscribe(observer);
    }

    onChooseImage($event) {
        this.file = $event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => (this.brandImgSrc = reader.result);
        reader.readAsDataURL(this.file);
    }

    private getCategoryDetails() {
        const observer = {
            next: (result) => {
                this.brand = result.data;
                console.log(this.brand);
                this.fillFormFields();
            },
            error: (err) => {
                console.log(err);
            }
        };

        this.brandSer
            .getBrandByID(this.activeRoute.snapshot.params['id'])
            .subscribe(observer);
    }

    private fillFormFields() {
        this.name.setValue(this.brand.name);
          this.brandImgSrc = this.brand.image;
    }
}
