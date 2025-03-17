
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  private apiUrl = 'http://localhost:3001'; // Ajuste para sua URL

  constructor(private http: HttpClient) {}

  
  uploadImage(file: File): Observable<{imageUrl: string}> {
    const formData = new FormData();
    formData.append('imagem', file);
    
    return this.http.post<{imageUrl: string}>(`${this.apiUrl}/upload`, formData);
  }
  

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(id: string, productData: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, productData);
  }
}