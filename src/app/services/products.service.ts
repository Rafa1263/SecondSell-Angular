import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { Product } from 'src/app/models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE PRODUCTOS
  private productList: Product[] = []

  // PRODUCTO CON EL QUE TRABAJAREMOS EN TODAS LAS VISTAS
  public products: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[])

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

}
