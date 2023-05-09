import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PaginationPipe } from 'src/app/pipes/product.pipe';
import { PaginationPipeModule } from 'src/app/pipes/product-pipe.module';

@NgModule({
  imports: [CommonModule, PaginationPipeModule,
  ],

})
export class HomeComponentModule { }
