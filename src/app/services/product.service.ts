import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) {}

  
  
  searchProducts(term: string): Observable<Product[]> {
    // JSON Server suporta busca usando _like
    return this.http.get<Product[]>(`${this.apiUrl}?q=${term}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products`).pipe(
      map(products => products.filter(product => product.name && product.price && product.cost))
    );
  }

  // Buscar produto por ID
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${id}`);
  }

  // Deletar produto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}products/${id}`);
  }
}