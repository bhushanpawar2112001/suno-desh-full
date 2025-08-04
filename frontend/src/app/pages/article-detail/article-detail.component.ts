import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { ApiService, Article } from '../../services/api.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center min-h-screen">
        <div class="text-center">
          <mat-spinner diameter="50"></mat-spinner>
          <p class="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !loading" class="flex justify-center items-center min-h-screen">
        <div class="text-center">
          <div class="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
          <p class="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
          <button mat-raised-button color="primary" (click)="goBack()">Go Back</button>
        </div>
      </div>

      <!-- Article Content -->
      <div *ngIf="!loading && !error && article" class="container mx-auto px-4 py-6">
        <!-- Back Button -->
        <div class="mb-6">
          <button mat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            <ng-container *ngIf="isEnglish(); else hindiBack">
              Back to News
            </ng-container>
            <ng-template #hindiBack>
              समाचार पर वापस जाएं
            </ng-template>
          </button>
        </div>

        <!-- Article Header -->
        <div class="mb-8">
          <div class="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block mb-4">
            {{ getCategoryName(article.category) }}
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {{ getArticleTitle(article) }}
          </h1>
          
          <!-- Article Metadata -->
          <div class="article-meta bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <!-- Author -->
              <div class="flex items-center">
                <mat-icon class="text-gray-400 mr-2 text-lg">person</mat-icon>
                <span class="font-medium">By {{ article.author.firstName }} {{ article.author.lastName }}</span>
              </div>
              
              <!-- Date -->
              <div class="flex items-center">
                <mat-icon class="text-gray-400 mr-2 text-lg">schedule</mat-icon>
                <span>{{ article.createdAt | date:'MMM d, y' }}</span>
              </div>
              
              <!-- Views -->
              <div class="flex items-center">
                <mat-icon class="text-gray-400 mr-2 text-lg">visibility</mat-icon>
                <span>{{ article.viewCount | number }} views</span>
              </div>
              
              <!-- Likes -->
              <div class="flex items-center">
                <mat-icon class="text-gray-400 mr-2 text-lg">thumb_up</mat-icon>
                <span>{{ article.likeCount | number }} likes</span>
              </div>
            </div>
            
            <!-- Reading Time Estimate -->
            <div class="mt-3 pt-3 border-t border-gray-200">
              <div class="flex items-center text-xs text-gray-500">
                <mat-icon class="text-gray-400 mr-1 text-sm">timer</mat-icon>
                <span>{{ calculateReadingTime(article) }} min read</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="mb-8">
          <img [src]="article.featuredImage" [alt]="getArticleTitle(article)" 
               class="w-full h-96 object-cover rounded-lg shadow-lg">
        </div>

        <!-- Article Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <mat-card class="p-8">
              <!-- Article Excerpt -->
              <div class="mb-6">
                <p class="text-xl text-gray-700 leading-relaxed font-medium">
                  {{ getArticleExcerpt(article) }}
                </p>
              </div>

              <!-- Article Body -->
              <div class="prose prose-lg max-w-none">
                <div [innerHTML]="getArticleContent(article)"></div>
              </div>

              <!-- Article Tags -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  <ng-container *ngIf="isEnglish(); else hindiTags">
                    Tags
                  </ng-container>
                  <ng-template #hindiTags>
                    टैग
                  </ng-template>
                </h3>
                <div class="flex flex-wrap gap-2">
                  <mat-chip *ngFor="let tag of article.tags" class="bg-red-100 text-red-800">
                    {{ tag }}
                  </mat-chip>
                </div>
              </div>

              <!-- Social Share -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  <ng-container *ngIf="isEnglish(); else hindiShare">
                    Share this article
                  </ng-container>
                  <ng-template #hindiShare>
                    इस लेख को साझा करें
                  </ng-template>
                </h3>
                <div class="flex gap-3">
                  <button mat-button color="primary" (click)="shareOnFacebook()">
                    <mat-icon>facebook</mat-icon>
                    Facebook
                  </button>
                  <button mat-button color="primary" (click)="shareOnTwitter()">
                    <mat-icon>twitter</mat-icon>
                    Twitter
                  </button>
                  <button mat-button color="primary" (click)="shareOnWhatsApp()">
                    <mat-icon>whatsapp</mat-icon>
                    WhatsApp
                  </button>
                </div>
              </div>
            </mat-card>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Related Articles -->
            <mat-card class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                <ng-container *ngIf="isEnglish(); else hindiRelated">
                  Related Articles
                </ng-container>
                <ng-template #hindiRelated>
                  संबंधित लेख
                </ng-template>
              </h3>
              <div class="space-y-4">
                <div *ngFor="let relatedArticle of relatedArticles" class="border-b border-gray-200 pb-4 last:border-b-0">
                  <img [src]="relatedArticle.featuredImage" [alt]="getArticleTitle(relatedArticle)" 
                       class="w-full h-32 object-cover rounded mb-2">
                  <h4 class="font-semibold text-gray-900 mb-1 text-sm">
                    {{ getArticleTitle(relatedArticle) }}
                  </h4>
                  <p class="text-xs text-gray-600 mb-2">{{ getArticleExcerpt(relatedArticle) }}</p>
                  <button mat-button color="primary" class="text-xs" (click)="readArticle(relatedArticle)">
                    <ng-container *ngIf="isEnglish(); else hindiReadMore">
                      READ MORE →
                    </ng-container>
                    <ng-template #hindiReadMore>
                      और पढ़ें →
                    </ng-template>
                  </button>
                </div>
              </div>
            </mat-card>

            <!-- Ad Banner -->
            <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-5 text-center min-h-[300px] flex items-center justify-center">
              <div>
                <div class="text-3xl opacity-60">📢</div>
                <div class="text-xs font-semibold text-gray-600 uppercase mt-2">ADVERTISEMENT</div>
                <div class="text-sm text-gray-500 mt-1">300x600</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .article-meta {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .article-meta .flex {
      align-items: center;
    }

    .article-meta mat-icon {
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .article-meta .flex:hover mat-icon {
      opacity: 1;
    }

    .article-meta span {
      font-weight: 500;
    }

    .article-meta .font-medium {
      color: #374151;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .article-meta {
        padding: 12px;
      }
      
      .article-meta .flex {
        gap: 12px;
      }
      
      .article-meta .flex > div {
        flex: 1;
        min-width: 0;
      }
    }

    @media (max-width: 480px) {
      .article-meta .flex {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .article-meta .flex > div {
        width: 100%;
      }
    }
  `]
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  relatedArticles: Article[] = [];
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loadArticle();
  }

  async loadArticle() {
    try {
      this.loading = true;
      this.error = false;

      const slug = this.route.snapshot.paramMap.get('slug');
      if (!slug) {
        this.error = true;
        return;
      }

      // Fetch article data from API
      this.article = await firstValueFrom(this.apiService.getArticleBySlug(slug));

      // Increment view count
      await this.incrementViewCount();

      // Load related articles
      this.loadRelatedArticles();

    } catch (error) {
      console.error('Error loading article:', error);
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  async incrementViewCount() {
    try {
      if (this.article) {
        // Call API to increment view count
        await firstValueFrom(this.apiService.incrementViewCount(this.article._id));
        // Update local view count
        this.article.viewCount++;
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  async loadRelatedArticles() {
    try {
      if (!this.article) return;

      // Fetch related articles from the same category
      this.relatedArticles = await firstValueFrom(
        this.apiService.getArticlesByCategory(this.article.category.slug)
      );

      // Filter out the current article and limit to 3 related articles
      this.relatedArticles = this.relatedArticles
        .filter(article => article._id !== this.article!._id)
        .slice(0, 3);

    } catch (error) {
      console.error('Error loading related articles:', error);
      this.relatedArticles = [];
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  readArticle(article: Article): void {
    this.router.navigate(['/article', article.slug]);
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.getArticleTitle(this.article!));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.getArticleTitle(this.article!));
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnWhatsApp(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.getArticleTitle(this.article!));
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  }

  isEnglish(): boolean {
    return this.languageService.isEnglish();
  }

  getArticleTitle(article: Article): string {
    return this.isEnglish() ? article.title : article.titleHindi;
  }

  getArticleExcerpt(article: Article): string {
    return this.isEnglish() ? article.excerpt : article.excerptHindi;
  }

  getArticleContent(article: Article): string {
    return this.isEnglish() ? article.content : article.contentHindi;
  }

  getCategoryName(category: any): string {
    return this.isEnglish() ? category.name : category.nameHindi;
  }

  calculateReadingTime(article: Article): number {
    const wordsPerMinute = 200; // Average reading speed
    const text = this.getArticleContent(article);
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
} 