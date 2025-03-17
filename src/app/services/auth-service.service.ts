import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage(): void {
    if (typeof window !== 'undefined') { // Verifica se está no navegador
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }
  

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length === 0) {
          return false; // Nenhum usuário encontrado
        }
        const user = users[0];
        if (user.password === password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false; // Senha incorreta
      }),
      catchError(() => of(false)) // Trata erros de rede
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

}