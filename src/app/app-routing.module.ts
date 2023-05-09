import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { ProductComponent } from 'src/app/views/product/product.component';
import { UploadPage } from 'src/app/views/upload/upload.component';

const routes: Routes = [{
  path: 'upload',
  component: UploadPage
},
{
  path: 'login',
  component: LoginPageComponent
},
{
  path: 'product/:id',
  component: ProductComponent
},
{
  path: '**',
  component: HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
