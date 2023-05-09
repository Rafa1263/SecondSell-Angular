import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Pagination } from 'src/app/models/pagination.model';
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
  constructor(private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

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
            console.log(this.user)

          })
        }
        console.log(this.product)
      }
    })


  }


}
