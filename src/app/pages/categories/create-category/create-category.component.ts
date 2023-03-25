import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "@services/categories.service";
import FormData from "form-data";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  createCategoryForm: FormGroup;
  errors: any = {};
  categoryImgSrc: any = null;
  file: any = null;

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder, private toaster: ToastrService, private router: Router) {
    this.createCategoryForm = fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  get name() {
    return this.createCategoryForm.get('name');
  };

  createCategorySubmit() {
    if (this.createCategoryForm.invalid)
      return;
    console.log("created")

    const form = new FormData();

    if (this.file) {
      form.append('image', this.file, this.file?.name);
    }
    form.append('name', this.name.value);

    const observer = {
      next: (result) => {
        this.router.navigate(['/categories']);
        this.toaster.success('Category successfuly created.');
      },
      error: (err) => {
        console.log(err);
      }
    }

    this.categoriesService.createCategory(form).subscribe(observer);
  }

  onChooseImage($event) {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.categoryImgSrc = reader.result;
    reader.readAsDataURL(this.file);
  }
}
