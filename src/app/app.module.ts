import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from 'src/app/components/upload-product/upload.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { UploadPage } from 'src/app/views/upload/upload.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoginComponent } from 'src/app/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    FooterComponent,
    UploadComponent,
    UploadPage,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
