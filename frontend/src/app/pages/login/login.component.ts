import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            SUNODESH News Administration
          </p>
        </div>
        <mat-card class="p-8">
          <form class="space-y-6" (ngSubmit)="onLogin()">
            <div>
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Email</mat-label>
                <input matInput [(ngModel)]="email" name="email" required>
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>
            </div>
            <div>
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Password</mat-label>
                <input matInput type="password" [(ngModel)]="password" name="password" required>
                <mat-icon matSuffix>lock</mat-icon>
              </mat-form-field>
            </div>
            <div *ngIf="error" class="text-red-600 text-sm text-center bg-red-50 p-3 rounded">
              {{ error }}
            </div>
            <div>
              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                class="w-full"
                [disabled]="loading || !email || !password">
                <mat-icon *ngIf="loading" class="animate-spin">refresh</mat-icon>
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </div>
          </form>
          
          <!-- Demo Credentials -->
          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 class="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
            <p class="text-xs text-blue-600">Email: admin&#64;newshub.com</p>
            <p class="text-xs text-blue-600">Password: admin123</p>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  async onLogin(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      // For demo purposes, we'll use a simple check
      // In production, this should call your backend API
      if (this.email === 'admin@newshub.com' && this.password === 'admin123') {
        // Store user info
        const userInfo = {
          email: this.email,
          role: 'admin',
          name: 'Admin User'
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('token', 'demo-token-123');
        
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Invalid email or password. Please try again.';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.error = 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
} 