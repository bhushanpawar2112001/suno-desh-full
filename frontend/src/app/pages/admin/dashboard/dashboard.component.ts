import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
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
      <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <mat-card class="card hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                <mat-icon>article</mat-icon>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Articles</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalArticles }}</p>
                <p class="text-xs text-green-600">+{{ stats.newArticles }} this week</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-green-100 text-green-600">
                <mat-icon>category</mat-icon>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Categories</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalCategories }}</p>
                <p class="text-xs text-blue-600">Active categories</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                <mat-icon>people</mat-icon>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Users</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
                <p class="text-xs text-purple-600">Registered users</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-orange-100 text-orange-600">
                <mat-icon>visibility</mat-icon>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Views</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalViews | number }}</p>
                <p class="text-xs text-orange-600">+{{ stats.viewsThisWeek }} this week</p>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <div *ngIf="!loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Recent Articles</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let article of recentArticles" class="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div class="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                  <img [src]="article.featuredImage" [alt]="article.title" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ article.title }}</h4>
                  <p class="text-sm text-gray-500">{{ article.createdAt | date:'MMM d, y HH:mm' }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ article.category.name }}</span>
                    <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                  </div>
                </div>
                <button mat-icon-button color="primary" (click)="editArticle(article)">
                  <mat-icon>edit</mat-icon>
                </button>
              </div>
              <div *ngIf="recentArticles.length === 0" class="text-center py-8 text-gray-500">
                <mat-icon class="text-4xl mb-2">article</mat-icon>
                <p>No articles found</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Quick Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-3">
              <button mat-raised-button color="primary" class="w-full" (click)="createArticle()">
                <mat-icon class="mr-2">add</mat-icon>
                Create New Article
              </button>
              <button mat-raised-button color="accent" class="w-full" (click)="addCategory()">
                <mat-icon class="mr-2">category</mat-icon>
                Add Category
              </button>
              <button mat-raised-button color="warn" class="w-full" (click)="inviteUser()">
                <mat-icon class="mr-2">person_add</mat-icon>
                Invite User
              </button>
              <button mat-raised-button class="w-full" (click)="viewAnalytics()">
                <mat-icon class="mr-2">analytics</mat-icon>
                View Analytics
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Category Distribution -->
      <div *ngIf="!loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Articles by Category</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-3">
              <div *ngFor="let category of categoryStats" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-3" [style.background-color]="getCategoryColor(category.slug)"></div>
                  <span class="font-medium">{{ category.name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">{{ category.articleCount }} articles</span>
                  <span class="text-xs text-gray-500">({{ (category.articleCount / stats.totalArticles * 100) | number:'1.0-0' }}%)</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Top Performing Articles</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-3">
              <div *ngFor="let article of topArticles" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex-1">
                  <h4 class="font-medium text-sm">{{ article.title }}</h4>
                  <p class="text-xs text-gray-500">{{ article.category.name }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold">{{ article.viewCount | number }} views</p>
                  <p class="text-xs text-gray-500">{{ article.likeCount | number }} likes</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .card {
      @apply shadow-sm border border-gray-200;
    }
  `]
})
export class DashboardComponent implements OnInit {
  loading = true;
  stats = {
    totalArticles: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalViews: 0,
    newArticles: 0,
    viewsThisWeek: 0
  };
  recentArticles: any[] = [];
  categoryStats: any[] = [];
  topArticles: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      this.loading = true;
      
      // Load all data in parallel
      const [articles, categories, users] = await Promise.all([
        firstValueFrom(this.apiService.getArticles()),
        firstValueFrom(this.apiService.getCategories()),
        firstValueFrom(this.apiService.getUsers())
      ]);

      // Calculate stats
      this.stats.totalArticles = articles.length;
      this.stats.totalCategories = categories.length;
      this.stats.totalUsers = users.length;
      this.stats.totalViews = articles.reduce((sum, article) => sum + article.viewCount, 0);
      this.stats.newArticles = articles.filter(article => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(article.createdAt) > weekAgo;
      }).length;
      this.stats.viewsThisWeek = Math.floor(this.stats.totalViews * 0.15); // Mock data

      // Recent articles (last 5)
      this.recentArticles = articles
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      // Category stats
      this.categoryStats = categories.map(category => ({
        ...category,
        articleCount: articles.filter(article => article.category.slug === category.slug).length
      }));

      // Top articles (by views)
      this.topArticles = articles
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 5);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.loading = false;
    }
  }

  async refreshData() {
    await this.loadDashboardData();
  }

  createArticle() {
    this.router.navigate(['/admin/articles/create']);
  }

  editArticle(article: any) {
    this.router.navigate(['/admin/articles/edit', article._id]);
  }

  addCategory() {
    this.router.navigate(['/admin/categories/create']);
  }

  inviteUser() {
    this.router.navigate(['/admin/users/invite']);
  }

  viewAnalytics() {
    this.router.navigate(['/admin/analytics']);
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
} 