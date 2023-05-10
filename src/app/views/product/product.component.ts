import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public products: Product[] = []

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.productService.getProducts().subscribe(() => {

      var prodid = this.route.snapshot.paramMap.get('id');

      if (prodid != undefined && parseInt(prodid) && prodid != null) {
        let tempID: number = parseInt(prodid)
        let temp = this.productService.productList.find(product => product.id === tempID);
        if (temp != undefined) {
          this.product = temp
          this.authService.getUser(this.product.userId).subscribe((us: User) => {
            this.user = us
            this.products = this.productService.productList

          })
        }
      }
    })


  }

  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])


    var prodid = String(productId);
    if (prodid != undefined && parseInt(prodid) && prodid != null) {
      let tempID: number = parseInt(prodid)
      let temp = this.productService.productList.find(product => product.id === tempID);
      if (temp != undefined) {
        this.product = temp
        this.authService.getUser(this.product.userId).subscribe((us: User) => {
          this.user = us
          this.products = this.productService.productList

        })
      }
    }

  }
}
