import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { retry } from 'rxjs';
import { Chat, Message } from 'src/app/models/chat.model';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public selection = 1
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.authService.getUsers().subscribe(() => {

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
    })
  }
  public showSection(page: number) {
    this.selection = page
    if (page == 1) {
      document.getElementById("p-1")!.classList.add('selected')
      document.getElementById("p-2")!.classList.remove('selected')
      document.getElementById("p-3")!.classList.remove('selected')
      return
    }
    else if (page == 2) {
      document.getElementById("p-2")!.classList.add('selected')
      document.getElementById("p-1")!.classList.remove('selected')
      document.getElementById("p-3")!.classList.remove('selected')
      return
    }
    if (page == 3) {
      document.getElementById("p-3")!.classList.add('selected')
      document.getElementById("p-2")!.classList.remove('selected')
      document.getElementById("p-1")!.classList.remove('selected')
      return
    }
  }
}
