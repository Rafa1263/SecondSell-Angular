import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[] = []
  public categories: Category[] = []
  public pagination: Pagination = {} as Pagination
  constructor(private productService: ProductService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.productService.getProducts().subscribe(() => {
      this.products = this.productService.productList
    })
    this.categoryService.getCategories().subscribe(() => {
      this.categories = this.categoryService.categoryList
    })
    this.pagination.pageSize = 8
    this.pagination.categorySize = [0, 1, 2, 3]
  }
  public getTimeDifference(created_at: Date): string {
    const timeElapsed = Date.now() - new Date(created_at).getTime();
    const seconds = timeElapsed / 1000;
    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds`;
    }
    const minutes = seconds / 60;
    if (minutes < 60) {
      return `${Math.floor(minutes)} minutes`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} hours`;
    }
    const days = hours / 24;
    if (days < 7) {
      return `${Math.floor(days)} days`;
    }
    const weeks = days / 7;
    if (weeks < 5) {
      return `${Math.floor(weeks)} weeks`;
    }
    const months = days / 30;
    return `${Math.floor(months)} months`;

  }


}
