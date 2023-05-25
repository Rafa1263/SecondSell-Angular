import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from 'src/app/views/chat/chat.component';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { ProductComponent } from 'src/app/views/product/product.component';
import { UploadPage } from 'src/app/views/upload/upload.component';
import { SingleChatComponent } from './views/single-chat/single-chat.component';
import { ProfileComponent } from 'src/app/views/profile/profile.component';
import { RegisterComponent } from 'src/app/views/register/register.component';
import { UserProfileComponent } from 'src/app/views/user-profile/user-profile.component';
import { CartComponent } from 'src/app/views/cart/cart.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
    path: 'upload',
    component: UploadPage
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'user/:id',
    component: UserProfileComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'chat/:id',
    component: SingleChatComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '**',
    redirectTo: "",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
