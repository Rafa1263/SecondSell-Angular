import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from 'src/app/components/upload-product/upload.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PaginationPipeModule } from 'src/app/pipes/product-pipe.module';
import { HomeComponentModule } from 'src/app/views/home/home.module';
import { HomeComponent } from 'src/app/views/home/home.component';
import { UploadPage } from 'src/app/views/upload/upload.component';
import { TopPipeModule } from 'src/app/pipes/top-pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    FooterComponent,
    UploadComponent,
    UploadPage,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationPipeModule,
    TopPipeModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
