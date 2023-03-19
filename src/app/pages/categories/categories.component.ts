import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "@services/categories.service";
import {ICategory} from "@/interfaces/icategory";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: ICategory[];

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories() {
    const observer = {
      next: (result: any) => {
        this.categories = result.data;
        console.log(result.data)
        // console.log(this.categories);
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    this.categoriesService.getAllCategories().subscribe(observer);
  }

  addNewCategory() {
    const observer = {
      next: (result: any) => {
        this.categories = result.data;
        console.log(result)
        // console.log(this.categories);
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    this.categoriesService.createCategory({name: 'other category'}).subscribe(observer);
  }


}
