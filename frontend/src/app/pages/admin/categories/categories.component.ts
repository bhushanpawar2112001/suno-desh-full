import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Categories Management</h1>
        <div class="flex gap-3">
          <button mat-raised-button color="primary" (click)="createCategory()">
            <mat-icon class="mr-2">add</mat-icon>
            Add Category
          </button>
          <button mat-raised-button color="accent" (click)="refreshData()">
            <mat-icon class="mr-2">refresh</mat-icon>
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-12">
        <mat-spinner diameter="50"></mat-spinner>
      </div>

      <!-- Stats Cards -->
      <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-blue-100 text-blue-600">
                <mat-icon>category</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Total Categories</p>
                <p class="text-xl font-semibold text-gray-900">{{ categories.length }}</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-green-100 text-green-600">
                <mat-icon>check_circle</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Active</p>
                <p class="text-xl font-semibold text-gray-900">{{ getActiveCount() }}</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-purple-100 text-purple-600">
                <mat-icon>article</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Total Articles</p>
                <p class="text-xl font-semibold text-gray-900">{{ getTotalArticles() }}</p>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Categories Table -->
      <mat-card *ngIf="!loading" class="card">
        <mat-card-content class="p-0">
          <table mat-table [dataSource]="categories" class="w-full">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Name</th>
              <td mat-cell *matCellDef="let category" class="px-4 py-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" [style.background-color]="getCategoryColor(category.slug)">
                    <span class="text-white font-bold text-sm">{{ category.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ category.name }}</h4>
                    <p class="text-sm text-gray-500">{{ category.nameHindi }}</p>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Slug Column -->
            <ng-container matColumnDef="slug">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Slug</th>
              <td mat-cell *matCellDef="let category" class="px-4 py-3">
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">{{ category.slug }}</code>
              </td>
            </ng-container>

            <!-- Description Column -->
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Description</th>
              <td mat-cell *matCellDef="let category" class="px-4 py-3">
                <div>
                  <p class="text-sm text-gray-900">{{ category.description }}</p>
                  <p class="text-xs text-gray-500">{{ category.descriptionHindi }}</p>
                </div>
              </td>
            </ng-container>

            <!-- Articles Column -->
            <ng-container matColumnDef="articleCount">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Articles</th>
              <td mat-cell *matCellDef="let category" class="px-4 py-3">
                <div class="text-center">
                  <p class="font-semibold text-lg">{{ category.articleCount || 0 }}</p>
                  <p class="text-xs text-gray-500">articles</p>
                </div>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Status</th>
              <td mat-cell *matCellDef="let category" class="px-4 py-3">
                <span [class]="category.isActive ? 'status-active' : 'status-inactive'">
                  {{ category.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Actions</th>
              <td mat-cell *matCellDef="let category" class="px-4 py-3">
                <div class="flex items-center space-x-2">
                  <button mat-icon-button color="primary" (click)="viewCategory(category)" matTooltip="View Category">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" (click)="editCategory(category)" matTooltip="Edit Category">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteCategory(category)" matTooltip="Delete Category">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-gray-50"></tr>
          </table>

          <!-- Empty State -->
          <div *ngIf="categories.length === 0" class="text-center py-12">
            <mat-icon class="text-6xl text-gray-300 mb-4">category</mat-icon>
            <h3 class="text-lg font-semibold text-gray-600 mb-2">No Categories Found</h3>
            <p class="text-gray-500 mb-4">Get started by creating your first category</p>
            <button mat-raised-button color="primary" (click)="createCategory()">
              <mat-icon class="mr-2">add</mat-icon>
              Create First Category
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .card {
      @apply shadow-sm border border-gray-200;
    }
    
    .status-active { 
      @apply text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium; 
    }
    .status-inactive { 
      @apply text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-medium; 
    }
  `]
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'slug', 'description', 'articleCount', 'status', 'actions'];
  categories: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.loadCategories();
  }

  async loadCategories() {
    try {
      this.loading = true;
      this.categories = await firstValueFrom(this.apiService.getCategories());
    } catch (error) {
      console.error('Error loading categories:', error);
      this.snackBar.open('Error loading categories', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  async refreshData() {
    await this.loadCategories();
  }

  getActiveCount(): number {
    return this.categories.filter(category => category.isActive).length;
  }

  getTotalArticles(): number {
    return this.categories.reduce((sum, category) => sum + (category.articleCount || 0), 0);
  }

  getCategoryColor(slug: string): string {
    const colors: { [key: string]: string } = {
      politics: '#ef4444',
      business: '#3b82f6',
      sports: '#10b981',
      entertainment: '#8b5cf6',
      technology: '#f59e0b',
      health: '#06b6d4'
    };
    return colors[slug] || '#6b7280';
  }

  createCategory() {
    this.router.navigate(['/admin/categories/create']);
  }

  viewCategory(category: any) {
    this.router.navigate(['/category', category.slug]);
  }

  editCategory(category: any) {
    this.router.navigate(['/admin/categories/edit', category._id]);
  }

  async deleteCategory(category: any) {
    const confirmed = confirm(`Are you sure you want to delete "${category.name}"? This will also delete all articles in this category.`);
    if (confirmed) {
      try {
        await firstValueFrom(this.apiService.deleteCategory(category._id));
        this.categories = this.categories.filter(c => c._id !== category._id);
        this.snackBar.open('Category deleted successfully', 'Close', { duration: 3000 });
      } catch (error) {
        console.error('Error deleting category:', error);
        this.snackBar.open('Error deleting category', 'Close', { duration: 3000 });
      }
    }
  }
} 