import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService, CreateUserDto } from '../../../services/api.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Create New User</h1>
          <p class="text-gray-600 mt-1">Add a new user to the system</p>
        </div>
        <button mat-button routerLink="/admin/users" class="text-gray-600">
          <mat-icon class="mr-2">arrow_back</mat-icon>
          Back to Users
        </button>
      </div>

      <!-- Form -->
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>User Information</mat-card-title>
            <mat-card-subtitle>Enter user details and assign role</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="space-y-4">
            <!-- Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="John">
                <mat-error *ngIf="userForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="Doe">
                <mat-error *ngIf="userForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Email -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="john.doe@example.com">
              <mat-error *ngIf="userForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="userForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <!-- Password -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" placeholder="Enter password">
              <mat-error *ngIf="userForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="userForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <!-- Role -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Role</mat-label>
              <mat-select formControlName="role">
                <mat-option value="user">User</mat-option>
                <mat-option value="editor">Editor</mat-option>
                <mat-option value="admin">Admin</mat-option>
              </mat-select>
              <mat-error *ngIf="userForm.get('role')?.hasError('required')">
                Role is required
              </mat-error>
            </mat-form-field>

            <!-- Status -->
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="isActive" formControlName="isActive" class="rounded">
              <label for="isActive" class="text-sm text-gray-700">Active User</label>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4 pt-6 border-t">
          <button type="button" mat-button routerLink="/admin/users">
            Cancel
          </button>
          <button type="submit" mat-raised-button color="primary" [disabled]="userForm.invalid || loading">
            <mat-icon class="mr-2" *ngIf="!loading">person_add</mat-icon>
            <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
            {{ loading ? 'Creating...' : 'Create User' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .card {
      @apply shadow-sm border border-gray-200;
    }
  `]
})
export class CreateUserComponent {
  userForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required],
      isActive: [true]
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      try {
        this.loading = true;
        const formData: CreateUserDto = this.userForm.value;
        
        await firstValueFrom(this.apiService.createUser(formData));
        
        this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/admin/users']);
      } catch (error) {
        console.error('Error creating user:', error);
        this.snackBar.open('Error creating user', 'Close', { duration: 3000 });
      } finally {
        this.loading = false;
      }
    }
  }
} 