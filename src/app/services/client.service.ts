import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private apiUrl = 'http://localhost:3001/';
  
    constructor(private http: HttpClient) {}
  
    
    
    searchClients(term: string): Observable<Client[]> {
      // JSON Server suporta busca usando _like
      return this.http.get<Client[]>(`${this.apiUrl}?q=${term}`);
    }
  
    getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiUrl}clients`).pipe(
        map(clients => clients.filter(client => client.name && client.address))
      );
    }
  
    // Buscar produto por ID
    getClient(id: string): Observable<Client> {
      return this.http.get<Client>(`${this.apiUrl}clients/${id}`);
    }
  
    // Deletar produto
    deleteClient(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}clients/${id}`);
    }
}
