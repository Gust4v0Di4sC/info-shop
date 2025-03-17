
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientFormService {
  private apiUrl = 'http://localhost:3001'; // Ajuste para sua URL

  constructor(private http: HttpClient) {}

  
  uploadImage(file: File): Observable<{imageUrl: string}> {
    const formData = new FormData();
    formData.append('imagem', file);
    
    return this.http.post<{imageUrl: string}>(`${this.apiUrl}/upload`, formData);
  }
  

  createClient(client: Omit<Client, 'id'>): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/${id}`);
  }

  updateClient(id: string, clientData: any): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${id}`, clientData);
  }
}