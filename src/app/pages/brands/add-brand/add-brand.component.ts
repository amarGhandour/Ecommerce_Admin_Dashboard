import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '@services/brand.service';
import FormData from 'form-data';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-brand',
    templateUrl: './add-brand.component.html',
    styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent {
    createBrandForm: FormGroup;
    errors: any = {};
    brandImgSrc: any = null;
    file: any = null;
    constructor(
        private brandService: BrandService,
        private fb: FormBuilder,
        private toaster: ToastrService,
        private router: Router
    ) {
        this.createBrandForm = fb.group({
            name: ['', Validators.required],
            image: [null]
        });
    }
    get name() {
        return this.createBrandForm.get('name');
    }
    createCategorySubmit() {
        if (this.createBrandForm.invalid) return;
        console.log('created');

        const form = new FormData();

        if (this.file) {
            form.append('image', this.file, this.file?.name);
        }
        form.append('name', this.name.value);

        const observer = {
            next: (result) => {
                this.router.navigate(['/brands']);
                this.toaster.success('brand successfuly created.');
            },
            error: (err) => {
                console.log(err);
            }
        };

        this.brandService.addBrand(form).subscribe(observer);
    }
    onChooseImage($event) {
        this.file = $event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (this.brandImgSrc = reader.result);
        reader.readAsDataURL(this.file);
    }
}
