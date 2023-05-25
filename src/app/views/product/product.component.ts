import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { Chat, Message } from 'src/app/models/chat.model';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public seller: User = {} as User
  public products: Product[] = []
  public chatList: Chat[] = []
  public prodid!: string
  public canSend = true
  public pagination = 0
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

    this.productService.getProducts().subscribe(() => {
      this.route.params.subscribe(params => {
        this.prodid = params['id'];
        this.pagination = 0
        if (this.prodid != undefined && parseInt(this.prodid) && this.prodid != null) {
          let tempID: number = parseInt(this.prodid)
          let temp = this.productService.productList.find(product => product.id === tempID);
          if (temp != undefined) {
            this.product = temp
            this.authService.getUser(this.product.userId).subscribe((us: User) => {
              this.seller = us
              this.products = this.productService.productList
              const imageP = <HTMLImageElement>document.getElementById("product-img")
              imageP.src = this.product.photo![this.pagination]
              this.chatService.getChats().subscribe(() => {
                this.chatList = this.chatService.chatList
              })
            })
          }
        }
      })
    });
  }
  public ensureUser() {
    if (this.user.id
      == this.seller.id) {
      document.getElementById("error-chat")!.innerHTML = "Error sending the message"
      return false
    }
    else {
      document.getElementById("error-chat")!.innerHTML = "Message sent successfully"
      return true
    }
  }
  public showpannel() {
    document.getElementById("pannel")!.classList.remove("displayed")
  }
  public hidepannel() {
    document.getElementById("pannel")!.classList.add("displayed")

  }
  public showMessageDirect() {
    document.getElementById("chat")!.classList.remove("displayed")
  }
  public hideMessageDirect() {
    document.getElementById("chat")!.classList.add("displayed")
  }
  public isActive(index: number) {
    const eles = document.querySelectorAll('.active-pagination') as NodeListOf<HTMLElement>;
    eles.forEach(element => {
      element.classList.remove('active-pagination');
    });
    this.pagination = index
    document.getElementsByClassName(`known-pagination-${index}`)[0]!.classList.add('active-pagination')
    const imageP = <HTMLImageElement>document.getElementById("product-img")
    imageP.src = this.product.photo![this.pagination]

  }
  public sendMessage() {
    if (!this.ensureUser()) {
      this.hideMessageDirect()
      this.showpannel()
      return
    }
    const chat = this.chatList.find(
      (chat) => chat.emit === this.user.id && chat.recept === this.seller.id && chat.productID === this.product.id
    );
    const messageInput = document.getElementById("chat-msg") as HTMLTextAreaElement | null;

    const created = Boolean(chat);


    if (this.canSend) {
      if (created) {
        let message: Message = {
          emit: this.user!.id!,
          message: messageInput!.value,
          seen: false,
          created_at: new Date(),
          chatId: chat!.id!,
        }
        if (this.ensureUser()) {
          this.canSend = false
          this.chatService.postMsg(message).subscribe(() => {
            this.hideMessageDirect()
            this.showpannel()
            this.chatService.getChats().subscribe(() => {
              this.chatList = this.chatService.chatList
              this.canSend = true
            })
          })
        }
        this.hideMessageDirect()
        this.showpannel()
      }
      else {

        this.canSend = false

        let chat: Chat = {
          emit: this.user!.id!,
          recept: this.seller!.id!,
          productID: parseInt(this.prodid),
        }
        this.chatService.postChat(chat).subscribe(() => {
          this.chatService.getChats().subscribe(() => {
            this.chatList = this.chatService.chatList
            this.canSend = true
            const chat = this.chatList.find(
              (chat) => chat.emit === this.user.id && chat.recept === this.seller.id && chat.productID === this.product.id
            );
            let message: Message = {
              emit: this.user!.id!,
              message: messageInput!.value,
              seen: false,
              created_at: new Date(),
              chatId: chat!.id!,
            }
            this.chatService.postMsg(message).subscribe(() => {
              this.canSend = true
            })
          })
          this.hideMessageDirect()
          this.showpannel()
        })


      }
    }
  }

  public userRedirect(userId: number) {
    this.router.navigate([`/user/${userId}`])

  }
}
