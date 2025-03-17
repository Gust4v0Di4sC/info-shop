import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  createOrder(order: Omit<Order, 'id'>): Observable<Order> {
      return this.http.post<Order>(`${this.apiUrl}/orders`, order);
    }
  
  getOrderById(id: string): Observable<Order> {
      return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }
  
  updateOrder(id: string, orderData: any): Observable<Order> {
      return this.http.put<Order>(`${this.apiUrl}/orders/${id}`, orderData);
  }
}
