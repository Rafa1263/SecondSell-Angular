import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, map, Observable, retry, switchMap, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE PRODUCTOS
  public productList: Product[] = []

  constructor(public http: HttpClient) {

  }

  // FUNCIÓN PARA HACER POST DE UN PRODUCTO
  public postProduct(user: Product): Observable<Product> {
    return this.http.post<Product>(`${this.CONFIG_URL}/products`, user)
  }

  // FUNCIÓN PARA OBTENER LOS PRODUCTOS Y ALMACENARLOS EN LA VAR PRIVADA
  public getProducts(): Observable<void> {
    return this.http.get<Product[]>(`${this.CONFIG_URL}/products`)
      .pipe(map(((products: Product[]) => {
        this.productList = products
      })))
  }
  public patchProductCart(productId: number): void {
    const url = `${this.CONFIG_URL}/products/${productId}`

    const requestBody = {
      active: false
    };
    this.http.get<Product>(url).subscribe((product: Product) => {
      if (product.id == productId) {
        this.http.patch<Product>(url, requestBody).subscribe(() => {
          console.log('buy')
        })

      }
    })




  }
}
