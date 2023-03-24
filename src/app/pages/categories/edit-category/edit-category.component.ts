import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICategory} from "@/interfaces/icategory";
import {CategoriesService} from "@services/categories.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editFormElm: FormGroup;
  category: ICategory;
  catImgSrc: any = null;
  errors: any = {};
  file: any = null;


  constructor(private toaster: ToastrService, private router: Router, private fb: FormBuilder,
              private categoriesService: CategoriesService, private activeRoute: ActivatedRoute, public dialog: MatDialog) {
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
    console.log('heee')
    this.getCategoryDetails();
  }

  editCategorySubmit() {

    if (this.editFormElm.invalid)
      return;

    const formData = new FormData();

    if (this.file)
      formData.append('image', this.file, this.file?.name);

    formData.append('name', this.name.value);

    const observer = {
      next: (result: any) => {
        this.router.navigate(['/categories']);
        this.toaster.success('Category successfully updated.');
      },
      error: (err) => {
        console.log(err)
      }
    };

    this.categoriesService.editCategory(formData, this.category._id).subscribe(observer);

  }

  onChooseImage($event) {
    this.file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.catImgSrc = reader.result;
    reader.readAsDataURL(this.file);
  }

  private getCategoryDetails() {
    const observer = {
      next: (result) => {
        this.category = result.data;
        console.log(this.category)
        this.fillFormFields();
      },
      error: (err) => {
        console.log(err)
      }
    }

    this.categoriesService.getCategoryByID(this.activeRoute.snapshot.params['id']).subscribe(observer);
  }

  private fillFormFields() {
    this.name.setValue(this.category.name);
    //  this.image.setValue(this.category.image);
    this.catImgSrc = this.category.image;
  }


}
