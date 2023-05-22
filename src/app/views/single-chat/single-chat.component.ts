import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { Chat, Message } from 'src/app/models/chat.model';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.scss']
})
export class SingleChatComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public users: User[] = []
  public direct: User = {} as User
  public products: Product[] = []
  public chatList: Chat[] = []
  public chat: Chat = {} as Chat
  public messages: Message[] = []
  public loaded = false
  public chatId: string = ''
  public shouldget = true
  subscription: Subscription | undefined;

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {
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
    })

    this.productService.getProducts().subscribe(() => {
      this.products = this.productService.productList
      this.chatService.getChats().subscribe(() => {
        this.chatId = this.route.snapshot.paramMap.get('id')!;
        this.chatList = this.chatService.chatList
        this.chat = this.chatList.find((chat: Chat) => chat.id === parseInt(this.chatId) && chat.emit === this.user.id || chat.recept === this.user.id)!;
        if ((this.chat == undefined)) {
          this.router.navigate(['/chat'])
        }
        this.product = this.products.find((prodcut: Product) => prodcut.id == this.chat.productID)!
        if (this.user.id === this.chat.recept) {
          this.direct = this.users.find((user: User) => user.id == this.chat.emit)!
        }
        else {
          this.direct = this.users.find((user: User) => user.id == this.chat.recept)!
        }
        this.loaded = true
        this.suscribirPeticion()
      })
    })
  }
  public messageRedirect(msgId: number) {
    const proute = `/chat/${msgId}`
    this.router.navigate([proute])
  }
  public sendMessage() {

    const messageInput = document.getElementById("chat-msg") as HTMLInputElement | null;
    if (messageInput!.value == "") {
      return
    }
    const created = Boolean(this.chat);
    let message: Message = {
      emit: this.user!.id!,
      message: messageInput!.value,
      seen: false,
      created_at: new Date(),
      chatId: -1
    }
    if (created) {
      this.chatService.getChat(this.chat.id!).subscribe((chat: Chat) => {
        this.chat = chat
        message.chatId = this.chat.id!
        this.shouldget = false
        this.chatService.postMsg(message).subscribe(() => {
          this.shouldget = true
        })
      })

    }
  }
  suscribirPeticion(): void {
    this.subscription = interval(600).subscribe(() => {
      this.chatService.getChat(this.chat.id!).subscribe((chat: Chat) => {
        if (this.shouldget) {
          this.chat = chat;
          this.chatService.getMsg(this.chat!.id!).subscribe((message: Message[]) => {
            this.messages = message
            this.chatService.patchMsg(this.chat.id!, this.direct.id!)

          });
        }
      });
    });
  }

  cancelarSuscripcion(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.cancelarSuscripcion();
  }
}
