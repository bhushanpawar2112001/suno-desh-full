import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService, Category } from '../../../services/api.service';

@Component({
  selector: 'app-create-article',
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
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Create New Article</h1>
          <p class="text-gray-600 mt-1">Add a new article to your news website</p>
        </div>
        <button mat-button routerLink="/admin/articles" class="text-gray-600">
          <mat-icon class="mr-2">arrow_back</mat-icon>
          Back to Articles
        </button>
      </div>

      <!-- Form -->
      <form [formGroup]="articleForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Title -->
            <mat-card class="card">
              <mat-card-content>
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Article Title</mat-label>
                  <input matInput formControlName="title" placeholder="Enter article title">
                  <mat-error *ngIf="articleForm.get('title')?.hasError('required')">
                    Title is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Article Title (Hindi)</mat-label>
                  <input matInput formControlName="titleHindi" placeholder="Enter article title in Hindi">
                  <mat-error *ngIf="articleForm.get('titleHindi')?.hasError('required')">
                    Hindi title is required
                  </mat-error>
                </mat-form-field>
              </mat-card-content>
            </mat-card>

            <!-- Content -->
            <mat-card class="card">
              <mat-card-header>
                <mat-card-title>Article Content</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Content</mat-label>
                  <textarea matInput formControlName="content" rows="10" placeholder="Write your article content here..."></textarea>
                  <mat-error *ngIf="articleForm.get('content')?.hasError('required')">
                    Content is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Content (Hindi)</mat-label>
                  <textarea matInput formControlName="contentHindi" rows="10" placeholder="Write your article content in Hindi..."></textarea>
                  <mat-error *ngIf="articleForm.get('contentHindi')?.hasError('required')">
                    Hindi content is required
                  </mat-error>
                </mat-form-field>
              </mat-card-content>
            </mat-card>

            <!-- Excerpt -->
            <mat-card class="card">
              <mat-card-header>
                <mat-card-title>Article Excerpt</mat-card-title>
                <mat-card-subtitle>Brief summary of the article</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Excerpt</mat-label>
                  <textarea matInput formControlName="excerpt" rows="3" placeholder="Brief summary of the article..."></textarea>
                  <mat-error *ngIf="articleForm.get('excerpt')?.hasError('required')">
                    Excerpt is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Excerpt (Hindi)</mat-label>
                  <textarea matInput formControlName="excerptHindi" rows="3" placeholder="Brief summary in Hindi..."></textarea>
                  <mat-error *ngIf="articleForm.get('excerptHindi')?.hasError('required')">
                    Hindi excerpt is required
                  </mat-error>
                </mat-form-field>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Category & Status -->
            <mat-card class="card">
              <mat-card-header>
                <mat-card-title>Article Settings</mat-card-title>
              </mat-card-header>
              <mat-card-content class="space-y-4">
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Category</mat-label>
                  <mat-select formControlName="categoryId">
                    <mat-option *ngFor="let category of categories" [value]="category._id">
                      {{ category.name }}
                    </mat-option>
                  </mat-select>
                  <mat-error *ngIf="articleForm.get('categoryId')?.hasError('required')">
                    Category is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Status</mat-label>
                  <mat-select formControlName="status">
                    <mat-option value="draft">Draft</mat-option>
                    <mat-option value="published">Published</mat-option>
                  </mat-select>
                </mat-form-field>

                <div class="flex items-center space-x-2">
                  <input type="checkbox" id="isFeatured" formControlName="isFeatured" class="rounded">
                  <label for="isFeatured" class="text-sm text-gray-700">Featured Article</label>
                </div>

                <div class="flex items-center space-x-2">
                  <input type="checkbox" id="isActive" formControlName="isActive" class="rounded">
                  <label for="isActive" class="text-sm text-gray-700">Active</label>
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Featured Image -->
            <mat-card class="card">
              <mat-card-header>
                <mat-card-title>Featured Image</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Image URL</mat-label>
                  <input matInput formControlName="featuredImage" placeholder="https://example.com/image.jpg">
                  <mat-error *ngIf="articleForm.get('featuredImage')?.hasError('required')">
                    Featured image is required
                  </mat-error>
                </mat-form-field>

                <div *ngIf="articleForm.get('featuredImage')?.value" class="mt-4">
                  <img [src]="articleForm.get('featuredImage')?.value" alt="Preview" class="w-full h-32 object-cover rounded">
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Tags -->
            <mat-card class="card">
              <mat-card-header>
                <mat-card-title>Tags</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Add Tags</mat-label>
                  <input matInput [(ngModel)]="newTag" [ngModelOptions]="{standalone: true}" (keyup.enter)="addTag()" placeholder="Press Enter to add tag">
                </mat-form-field>

                <div class="flex flex-wrap gap-2 mt-2">
                  <mat-chip *ngFor="let tag of tags" (removed)="removeTag(tag)" color="primary" selected>
                    {{ tag }}
                    <mat-icon matChipRemove>cancel</mat-icon>
                  </mat-chip>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4 pt-6 border-t">
          <button type="button" mat-button routerLink="/admin/articles">
            Cancel
          </button>
          <button type="submit" mat-raised-button color="primary" [disabled]="articleForm.invalid || loading">
            <mat-icon class="mr-2" *ngIf="!loading">save</mat-icon>
            <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
            {{ loading ? 'Creating...' : 'Create Article' }}
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
export class CreateArticleComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  tags: string[] = [];
  newTag = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      titleHindi: ['', Validators.required],
      content: ['', Validators.required],
      contentHindi: ['', Validators.required],
      excerpt: ['', Validators.required],
      excerptHindi: ['', Validators.required],
      categoryId: ['', Validators.required],
      status: ['draft'],
      isFeatured: [false],
      isActive: [true],
      featuredImage: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.loadCategories();
  }

  async loadCategories() {
    try {
      this.categories = await firstValueFrom(this.apiService.getCategories());
    } catch (error) {
      console.error('Error loading categories:', error);
      this.snackBar.open('Error loading categories', 'Close', { duration: 3000 });
    }
  }

  addTag() {
    if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  async onSubmit() {
    if (this.articleForm.valid) {
      try {
        this.loading = true;
        const formData = {
          ...this.articleForm.value,
          tags: this.tags
        };

        await firstValueFrom(this.apiService.createArticle(formData));
        
        this.snackBar.open('Article created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/admin/articles']);
      } catch (error) {
        console.error('Error creating article:', error);
        this.snackBar.open('Error creating article', 'Close', { duration: 3000 });
      } finally {
        this.loading = false;
      }
    }
  }
} 