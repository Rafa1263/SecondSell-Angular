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
  ngOnInit() {
    this.productService.getProducts().subscribe(() => {
      this.products = this.productService.productList
    })
    this.pagination.pageSize = 8
  }
}
