import { Pipe, PipeTransform } from '@angular/core'
import { Product } from 'src/app/models/product.model'


@Pipe({
  name: 'top',
})
export class TopPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    return products.sort((a, b) => b.likes - a.likes);
  }
}
