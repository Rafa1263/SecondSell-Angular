import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { UploadPage } from 'src/app/views/upload/upload.component';

const routes: Routes = [{
  path: 'upload',
  component: UploadPage
},
{
  path: 'login',
  component: LoginPageComponent
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
