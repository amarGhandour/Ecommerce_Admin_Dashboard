import {Component, OnInit} from '@angular/core';
import {IProduct} from "@/interfaces/iproduct";
import {ProductsService} from "@services/products.service";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IBrand} from "@/interfaces/ibrand";
import {ICategory} from "@/interfaces/icategory";
import {CategoriesService} from "@services/categories.service";
import {BrandsService} from "@services/brands.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product!: IProduct;

  brands!: IBrand[];
  categories!: ICategory[];
  editProductFormElm: FormGroup;
  productImgSrc: any = null;
  errors: any = {};

  file: any = null;

  images: any[] = [];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private productsService: ProductsService, private categoriesService: CategoriesService, private brandsService: BrandsService, private toaster: ToastrService, private fb: FormBuilder) {
    this.editProductFormElm = fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      priceAfterDiscount: [''],
      colors: this.fb.array([], [Validators.maxLength(5)]),
      imageCover: [''],
      category: ['', [Validators.required]],
      //subcategories?: string[],
      brand: ['']
    });
  }

  get colors() {
    return this.editProductFormElm.get('colors') as FormArray
  }

  get title() {
    return this.editProductFormElm.get('title');
  }

  get category() {
    return this.editProductFormElm.get('category');
  }

  get brand() {
    return this.editProductFormElm.get('brand');
  }

  get imageCover() {
    return this.editProductFormElm.get('imageCover');
  }

  get price() {
    return this.editProductFormElm.get('price');
  }

  get quantity() {
    return this.editProductFormElm.get('quantity');
  }

  get description() {
    return this.editProductFormElm.get('description');
  }

  get priceAfterDiscount() {
    return this.editProductFormElm.get('priceAfterDiscount');
  }

  ngOnInit(): void {
    this.getAllCategories();
    // this.getProductById();
    // this.getAllBrands();
  }

  addColor() {
    this.colors.push(new FormControl(''));
  }

  onChooseImage($event: any) {
    this.file = $event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => this.productImgSrc = reader.result;

    reader.readAsDataURL(this.file);

    for (let i = 1; i < $event.target.files.length; i++) {
      this.images.push($event.target.files[i]);
    }

  }

  removeColor(i: any) {
    this.colors.removeAt(i);
  }

  editProductSubmit() {

    if (this.editProductFormElm.invalid)
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
        this.toaster.success('Product successfully updated.');
      },
      error: (err: any) => {
        console.log(err);
      }
    }

    console.log('keysssss')
    formData.forEach((item, key) => {
      console.log(key)
    });

    this.productsService.updateProduct(formData, this.product._id).subscribe(observer);
  }

  fillFormControls() {
    this.title.patchValue(this.product.title);
    this.description.patchValue(this.product.description);
    this.quantity.patchValue(this.product.quantity);
    this.price.patchValue(this.product.price);
    this.priceAfterDiscount.patchValue(this.product.priceAfterDiscount);
    this.brand.patchValue(this.product.brand);


    let categoryId = null;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name == this.product.category.name) {
        categoryId = this.categories[i]._id;
        break;
      }
    }

    if (categoryId)
      this.category.patchValue(categoryId);

    this.productImgSrc = this.product.imageCover;

    this.product.colors.forEach((color) => {
      this.colors.push(new FormControl(color))
    });
  }

  private getAllCategories() {
    const observer = {
      next: (result: any) => {
        this.categories = result.data;
        this.getAllBrands()
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
        this.getProductById();
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    this.brandsService.getAllBrands().subscribe(observer);
  }

  private getProductById() {

    const observer = {
      next: (result) => {
        this.product = result.data;
        this.fillFormControls();
      },
      error: (err) => {
        console.log(err);
      }
    }
    this.productsService.getProductById(this.activeRoute.snapshot.params['id']).subscribe(observer);
  }
}
