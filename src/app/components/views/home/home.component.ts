import { Component, OnInit, HostListener} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth-service.service';


@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatCardModule,MatFormFieldModule,MatInputModule,MatSnackBarModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  mouseX: number = 0;
  mouseY: number = 0;

  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  isLoggingIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Calcula a posição relativa do mouse (em porcentagem)
    this.mouseX = (event.clientX / window.innerWidth) * 200;
    this.mouseY = (event.clientY / window.innerHeight) * 200;
  }

  ngOnInit(): void {
    
  }

  getParallaxStyle(): string {
    // Limita o movimento do background (ajuste os valores conforme necessário)
    const moveX = (this.mouseX - 100) * 0.05;
    const moveY = (this.mouseY - 100) * 0.05;
    return `translate(${moveX}px, ${moveY}px)`;
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email,password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dash']);
          } else {
            this.snackBar.open('Email ou senha inválidos', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        },
        error: (error) => {
          console.error('Erro ao fazer login:', error);
          this.snackBar.open('Erro ao fazer login', 'Fechar', {
            duration: 3000
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
