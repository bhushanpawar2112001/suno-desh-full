import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Articles Management</h1>
        <div class="flex gap-3">
          <button mat-raised-button color="primary" (click)="createArticle()">
            <mat-icon class="mr-2">add</mat-icon>
            Create Article
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
      <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-blue-100 text-blue-600">
                <mat-icon>article</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Total Articles</p>
                <p class="text-xl font-semibold text-gray-900">{{ articles.length }}</p>
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
                <p class="text-sm font-medium text-gray-600">Published</p>
                <p class="text-xl font-semibold text-gray-900">{{ getPublishedCount() }}</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-yellow-100 text-yellow-600">
                <mat-icon>edit</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Drafts</p>
                <p class="text-xl font-semibold text-gray-900">{{ getDraftCount() }}</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-purple-100 text-purple-600">
                <mat-icon>visibility</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Total Views</p>
                <p class="text-xl font-semibold text-gray-900">{{ getTotalViews() | number }}</p>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Articles Table -->
      <mat-card *ngIf="!loading" class="card">
        <mat-card-content class="p-0">
          <table mat-table [dataSource]="paginatedArticles" class="w-full">
            <!-- Title Column -->
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Title</th>
              <td mat-cell *matCellDef="let article" class="px-4 py-3">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                    <img [src]="article.featuredImage" [alt]="article.title" class="w-full h-full object-cover">
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ article.title }}</h4>
                    <p class="text-sm text-gray-500">{{ article.excerpt }}</p>
                    <p class="text-xs text-gray-400">{{ article.createdAt | date:'MMM d, y HH:mm' }}</p>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Category Column -->
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Category</th>
              <td mat-cell *matCellDef="let article" class="px-4 py-3">
                <mat-chip color="primary" selected>{{ article.category.name }}</mat-chip>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Status</th>
              <td mat-cell *matCellDef="let article" class="px-4 py-3">
                <span [class]="getStatusClass(article.status)">{{ article.status }}</span>
              </td>
            </ng-container>

            <!-- Author Column -->
            <ng-container matColumnDef="author">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Author</th>
              <td mat-cell *matCellDef="let article" class="px-4 py-3">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium">{{ article.author.firstName.charAt(0) }}{{ article.author.lastName.charAt(0) }}</span>
                  </div>
                  <span>{{ article.author.firstName }} {{ article.author.lastName }}</span>
                </div>
              </td>
            </ng-container>

            <!-- Views Column -->
            <ng-container matColumnDef="views">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Views</th>
              <td mat-cell *matCellDef="let article" class="px-4 py-3">
                <div class="text-center">
                  <p class="font-semibold">{{ article.viewCount | number }}</p>
                  <p class="text-xs text-gray-500">{{ article.likeCount | number }} likes</p>
                </div>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Actions</th>
              <td mat-cell *matCellDef="let article" class="px-4 py-3">
                <div class="flex items-center space-x-2">
                  <button mat-icon-button color="primary" (click)="viewArticle(article)" matTooltip="View Article">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" (click)="editArticle(article)" matTooltip="Edit Article">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteArticle(article)" matTooltip="Delete Article">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-gray-50"></tr>
          </table>

          <!-- Pagination -->
          <div class="flex justify-center p-4" *ngIf="articles.length > pageSize">
            <mat-paginator 
              [length]="articles.length"
              [pageSize]="pageSize"
              [pageIndex]="currentPage"
              [pageSizeOptions]="[5, 10, 25, 50]"
              (page)="onPageChange($event)"
              showFirstLastButtons>
            </mat-paginator>
          </div>

          <!-- Empty State -->
          <div *ngIf="articles.length === 0" class="text-center py-12">
            <mat-icon class="text-6xl text-gray-300 mb-4">article</mat-icon>
            <h3 class="text-lg font-semibold text-gray-600 mb-2">No Articles Found</h3>
            <p class="text-gray-500 mb-4">Get started by creating your first article</p>
            <button mat-raised-button color="primary" (click)="createArticle()">
              <mat-icon class="mr-2">add</mat-icon>
              Create First Article
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
    
    .status-published { 
      @apply text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium; 
    }
    .status-draft { 
      @apply text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium; 
    }
    .status-archived { 
      @apply text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium; 
    }
  `]
})
export class ArticlesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'category', 'status', 'author', 'views', 'actions'];
  articles: any[] = [];
  loading = true;
  currentPage = 0;
  pageSize = 10;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.loadArticles();
  }

  async loadArticles() {
    try {
      this.loading = true;
      this.articles = await firstValueFrom(this.apiService.getArticles());
    } catch (error) {
      console.error('Error loading articles:', error);
      this.snackBar.open('Error loading articles', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  async refreshData() {
    await this.loadArticles();
  }

  get paginatedArticles(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.articles.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getPublishedCount(): number {
    return this.articles.filter(article => article.status === 'published').length;
  }

  getDraftCount(): number {
    return this.articles.filter(article => article.status === 'draft').length;
  }

  getTotalViews(): number {
    return this.articles.reduce((sum, article) => sum + article.viewCount, 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'published': return 'status-published';
      case 'draft': return 'status-draft';
      case 'archived': return 'status-archived';
      default: return 'status-draft';
    }
  }

  createArticle() {
    this.router.navigate(['/admin/articles/create']);
  }

  viewArticle(article: any) {
    this.router.navigate(['/article', article.slug]);
  }

  editArticle(article: any) {
    this.router.navigate(['/admin/articles/edit', article._id]);
  }

  async deleteArticle(article: any) {
    const confirmed = confirm(`Are you sure you want to delete "${article.title}"?`);
    if (confirmed) {
      try {
        await firstValueFrom(this.apiService.deleteArticle(article._id));
        this.articles = this.articles.filter(a => a._id !== article._id);
        this.snackBar.open('Article deleted successfully', 'Close', { duration: 3000 });
      } catch (error) {
        console.error('Error deleting article:', error);
        this.snackBar.open('Error deleting article', 'Close', { duration: 3000 });
      }
    }
  }
} 