import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService, CreateCategoryDto } from '../../../services/api.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Create New Category</h1>
          <p class="text-gray-600 mt-1">Add a new category to organize your articles</p>
        </div>
        <button mat-button routerLink="/admin/categories" class="text-gray-600">
          <mat-icon class="mr-2">arrow_back</mat-icon>
          Back to Categories
        </button>
      </div>

      <!-- Form -->
      <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Category Information</mat-card-title>
            <mat-card-subtitle>Enter category details in both English and Hindi</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="space-y-4">
            <!-- Name -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Category Name (English)</mat-label>
              <input matInput formControlName="name" placeholder="e.g., Technology">
              <mat-error *ngIf="categoryForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Category Name (Hindi)</mat-label>
              <input matInput formControlName="nameHindi" placeholder="e.g., प्रौद्योगिकी">
              <mat-error *ngIf="categoryForm.get('nameHindi')?.hasError('required')">
                Hindi name is required
              </mat-error>
            </mat-form-field>

            <!-- Description -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Description (English)</mat-label>
              <textarea matInput formControlName="description" rows="3" placeholder="Brief description of the category"></textarea>
              <mat-error *ngIf="categoryForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Description (Hindi)</mat-label>
              <textarea matInput formControlName="descriptionHindi" rows="3" placeholder="Brief description in Hindi"></textarea>
              <mat-error *ngIf="categoryForm.get('descriptionHindi')?.hasError('required')">
                Hindi description is required
              </mat-error>
            </mat-form-field>

            <!-- Status -->
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="isActive" formControlName="isActive" class="rounded">
              <label for="isActive" class="text-sm text-gray-700">Active Category</label>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4 pt-6 border-t">
          <button type="button" mat-button routerLink="/admin/categories">
            Cancel
          </button>
          <button type="submit" mat-raised-button color="primary" [disabled]="categoryForm.invalid || loading">
            <mat-icon class="mr-2" *ngIf="!loading">save</mat-icon>
            <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
            {{ loading ? 'Creating...' : 'Create Category' }}
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
export class CreateCategoryComponent {
  categoryForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      nameHindi: ['', Validators.required],
      description: ['', Validators.required],
      descriptionHindi: ['', Validators.required],
      isActive: [true]
    });
  }

  async onSubmit() {
    if (this.categoryForm.valid) {
      try {
        this.loading = true;
        const formData: CreateCategoryDto = this.categoryForm.value;
        
        await firstValueFrom(this.apiService.createCategory(formData));
        
        this.snackBar.open('Category created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/admin/categories']);
      } catch (error) {
        console.error('Error creating category:', error);
        this.snackBar.open('Error creating category', 'Close', { duration: 3000 });
      } finally {
        this.loading = false;
      }
    }
  }
} 