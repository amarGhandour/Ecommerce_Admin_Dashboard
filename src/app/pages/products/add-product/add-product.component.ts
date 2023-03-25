import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "@services/categories.service";
import {ProductsService} from "@services/products.service";
import {ICategory} from "@/interfaces/icategory";
import {IBrand} from "@/interfaces/ibrand";
import {BrandsService} from "@services/brands.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  createProductForm: FormGroup;

  categories: ICategory[] = [];
  brands: IBrand[] = [];

  errors: any = {};
  productImgSrc: any = null;

  file: any = null;

  images: any = [];

  constructor(private router: Router, private toasterService: ToastrService, private fb: FormBuilder, private categoriesService: CategoriesService, private brandsService: BrandsService, private productService: ProductsService) {
    this.createProductForm = fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      priceAfterDiscount: [''],
      colors: this.fb.array([], [Validators.maxLength(5)]),
      imageCover: [''],
      // images: string[],
      category: ['', [Validators.required]],
      //subcategories?: string[],
      brand: ['']
    });
  }

  get colors() {
    return this.createProductForm.get('colors') as FormArray
  }

  get title() {
    return this.createProductForm.get('title');
  }

  get category() {
    return this.createProductForm.get('category');
  }

  get brand() {
    return this.createProductForm.get('brand');
  }

  get imageCover() {
    return this.createProductForm.get('imageCover');
  }

  get price() {
    return this.createProductForm.get('price');
  }

  get quantity() {
    return this.createProductForm.get('quantity');
  }

  get description() {
    return this.createProductForm.get('description');
  }

  get priceAfterDiscount() {
    return this.createProductForm.get('priceAfterDiscount');
  }

  addColor() {
    this.colors.push(new FormControl(''));
  }

  createProductSubmit() {
    if (this.createProductForm.invalid)
      return;

    const formData = new FormData();
    if (this.file)
      formData.append('imageCover', this.file, this.file?.name);

    if (this.images.length) {
      for (let i = 0; i < this.images.length; i++) {
        formData.append('images', this.images[i], this.images[i]?.name);
      }
    }

    console.log(this.images);
    console.log(this.file);

    formData.append('title', this.title.value);
    formData.append('description', this.description.value);
    formData.append('category', this.category.value);

    if (this.brand.value != '')
      formData.append('brand', this.brand.value);

    formData.append('price', this.price.value);

    if (this.priceAfterDiscount.value != '')
      formData.append('priceAfterDiscount', this.priceAfterDiscount.value);

    formData.append('quantity', this.quantity.value);

    this.colors.getRawValue().forEach(e => {
      formData.append('colors[]', e);
    });

    const observer = {
      next: (result: any) => {
        this.router.navigate(['/products']);
        this.toasterService.success('Product successfully created.');
      },
      error: (err: any) => {
        console.log(err);
      }
    }

    console.log('keysssss')
    formData.forEach((item, key) => {
      console.log(key)
    });

    this.productService.addProduct(formData).subscribe(observer);
  }

  onChooseImage($event) {
    this.file = $event.target.files[0];

    for (let i = 1; i < $event.target.files.length; i++) {
      this.images.push($event.target.files[i]);
    }
    const reader = new FileReader();
    reader.onload = e => this.productImgSrc = reader.result;

    reader.readAsDataURL(this.file);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }

  private getAllCategories() {
    const observer = {
      next: (result: any) => {
        this.categories = result.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    this.categoriesService.getAllCategories().subscribe(observer);
  }

  private getAllBrands() {
    const observer = {
      next: (result: any) => {
        this.brands = result.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    this.brandsService.getAllBrands().subscribe(observer);
  }
}
