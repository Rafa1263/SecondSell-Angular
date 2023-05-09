import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[] = []
  public pagination: Pagination = {} as Pagination
  constructor(private productService: ProductService) {

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

  ngOnInit() {
    this.productService.getProducts().subscribe(() => {
      this.products = this.productService.productList
      console.log(this.getTimeDifference(this.products[0].created_at))

    })

    this.pagination.pageSize = 8
  }
}
