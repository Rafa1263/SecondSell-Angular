import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
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
  path: '**',
  component: HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
