import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/cart.model';
import { Category } from 'src/app/models/category.model';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public productsCart: ProductCart[] = []
  public user: User = {} as User
  public users: User[] = []
  public products: Product[] = []

  constructor(private router: Router, private productService: ProductService, private transactionService: TransactionService, private readonly authService: AuthService) {

  }
  ngOnInit(): void {
    this.authService.getUsers().subscribe(() => {
      this.users = this.authService.usuarios
      if (this.authService.getUserByCookie()) {
        this.authService.user.subscribe((us: User) => {
          this.user = us
        })
      }
      else {
        this.authService.user.subscribe((us: User) => {
          if (!(us.username)) {
            this.router.navigate(['/login']);
          }
          else {
            this.user = us
          }
        })
      }
      this.transactionService.getCart(this.user.id!).subscribe(() => {
        this.transactionService.getProductsCart(this.transactionService.cart.id!).subscribe(() => {
          this.productsCart = this.transactionService.productCartList
          this.productService.getProducts().subscribe(() => {
            this.products = this.productService.productList.filter(product => {
              return this.productsCart.some(cartItem => cartItem.productId === product.id);
            });
          })
        })
      })
    })
  }

}