import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) {}

  
  
  searchOrders(term: string): Observable<Order[]> {
    // JSON Server suporta busca usando _like
    return this.http.get<Order[]>(`${this.apiUrl}?q=${term}`);
  }

  

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}orders`).pipe(
      map(orders => orders.filter(order => order.name && order.product))
    );
  }

  // Buscar produto por ID
  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}orders/${id}`);
  }

  // Deletar produto
  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}orders/${id}`);
  }
}
