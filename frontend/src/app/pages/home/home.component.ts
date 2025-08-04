import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { ApiService, Article, Category } from '../../services/api.service';
import { AdBannerComponent } from '../../components/ad-banner/ad-banner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule, MatIconModule, MatPaginatorModule, MatTabsModule, AdBannerComponent],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center min-h-screen">
        <div class="text-center">
          <mat-spinner diameter="50"></mat-spinner>
          <p class="mt-4 text-gray-600">Loading SUNODESH news...</p>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !loading" class="flex justify-center items-center min-h-screen">
        <div class="text-center">
          <div class="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p class="text-gray-600 mb-4">Unable to load news content. Please try again later.</p>
          <button mat-raised-button color="primary" (click)="loadData()">Retry</button>
        </div>
      </div>

      <!-- Content -->
      <div *ngIf="!loading && !error">
        <!-- Breaking News Banner -->
        <div class="breaking-news-banner">
          <div class="container mx-auto px-4">
            <div class="breaking-content">
              <div class="breaking-label">
                <span class="breaking-icon">🔥</span>
                <span class="breaking-text">BREAKING</span>
              </div>
              <div class="breaking-ticker">
                <span class="ticker-text">
                  <ng-container *ngIf="isEnglish(); else hindiBreaking">
                    Major developments in technology sector as AI breakthrough announced • New sports records broken • Entertainment industry updates
                  </ng-container>
                  <ng-template #hindiBreaking>
                    प्रौद्योगिकी क्षेत्र में बड़े विकास के रूप में एआई सफलता की घोषणा • नए खेल रिकॉर्ड टूटे • मनोरंजन उद्योग अपडेट
                  </ng-template>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main News Layout -->
        <div class="container mx-auto px-4 py-6">
          <!-- Top Headlines Section -->
          <section class="mb-8">
            <div class="border-b-4 border-red-600 mb-4">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">SUNODESH</h1>
              <p class="text-sm text-gray-600 mb-4">
                <ng-container *ngIf="isEnglish(); else hindiTagline">
                  Your Trusted Source for Breaking News
                </ng-container>
                <ng-template #hindiTagline>
                  तोड़ने वाली खबरों का आपका विश्वसनीय स्रोत
                </ng-template>
              </p>
            </div>
            
            <!-- Main Headline -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div class="lg:col-span-2">
                <mat-card class="bg-gray-100" *ngIf="featuredArticles[0]">
                  <img mat-card-image [src]="featuredArticles[0].featuredImage" [alt]="getArticleTitle(featuredArticles[0])" class="w-full h-64 object-cover rounded mb-4">
                  <mat-card-content>
                    <div class="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block mb-2">TOP STORY</div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">
                      {{ getArticleTitle(featuredArticles[0]) }}
                    </h2>
                    <p class="text-gray-600 mb-3">
                      {{ getArticleExcerpt(featuredArticles[0]) }}
                    </p>
                    <div class="flex items-center text-sm text-gray-500 mb-4">
                      <span>By {{ featuredArticles[0].author.firstName }} {{ featuredArticles[0].author.lastName }}</span>
                      <span class="mx-2">•</span>
                      <span>{{ featuredArticles[0].viewCount }} views</span>
                      <span class="mx-2">•</span>
                      <span>{{ featuredArticles[0].likeCount }} likes</span>
                    </div>
                    <button mat-raised-button color="primary" (click)="readFullArticle(featuredArticles[0])">
                      <ng-container *ngIf="isEnglish(); else hindiReadFull">
                        READ FULL ARTICLE
                      </ng-container>
                      <ng-template #hindiReadFull>
                        पूरा लेख पढ़ें
                      </ng-template>
                    </button>
                  </mat-card-content>
                </mat-card>
              </div>
              
              <!-- Sidebar Headlines -->
              <div class="space-y-4">
                <!-- Ad Banner -->
                <app-ad-banner position="sidebar" size="300x600"></app-ad-banner>
                
                <!-- Sidebar Articles -->
                <div class="border-b border-gray-200 pb-4" *ngFor="let article of featuredArticles.slice(1, 4)">
                  <div class="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                    {{ getCategoryName(article.category) }}
                  </div>
                  <h3 class="font-bold text-gray-900 mb-2">{{ getArticleTitle(article) }}</h3>
                  <p class="text-sm text-gray-600 mb-2">{{ getArticleExcerpt(article) }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                    <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                      <ng-container *ngIf="isEnglish(); else hindiReadMore">
                        READ MORE →
                      </ng-container>
                      <ng-template #hindiReadMore>
                        और पढ़ें →
                      </ng-template>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Category Tabs -->
          <section class="mb-8">
            <div class="border-b-2 border-gray-300 mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                <ng-container *ngIf="isEnglish(); else hindiTechnologyNews">
                  TECHNOLOGY NEWS
                </ng-container>
                <ng-template #hindiTechnologyNews>
                  प्रौद्योगिकी समाचार
                </ng-template>
              </h2>
              <p class="text-sm text-gray-600">
                <ng-container *ngIf="isEnglish(); else hindiTechnologyDesc">
                  Latest technology news, innovations, and updates from around the world.
                </ng-container>
                <ng-template #hindiTechnologyDesc>
                  दुनिया भर से नवीनतम प्रौद्योगिकी समाचार, नवाचार और अपडेट।
                </ng-template>
              </p>
            </div>

            <!-- Ad Space -->
            <div class="ad-space mb-6">
              <app-ad-banner position="leaderboard" size="728x90"></app-ad-banner>
            </div>
            
            <mat-tab-group (selectedTabChange)="onCategoryChange($event)" class="news-tabs" [selectedIndex]="getSelectedTabIndex()">
              <mat-tab [label]="getAllNewsLabel()">
                <div class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of currentPageArticles">
                      <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-48 object-cover">
                      <mat-card-content>
                        <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                          {{ getCategoryName(article.category) }}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                        <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                          <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                            <ng-container *ngIf="isEnglish(); else hindiReadMore">
                              READ MORE →
                            </ng-container>
                            <ng-template #hindiReadMore>
                              और पढ़ें →
                            </ng-template>
                          </button>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  </div>
                  
                  <!-- Pagination -->
                  <div class="mt-8 flex justify-center" *ngIf="totalArticles > pageSize">
                    <mat-paginator 
                      [length]="totalArticles"
                      [pageSize]="pageSize"
                      [pageIndex]="currentPage"
                      [pageSizeOptions]="[6, 12, 24, 48]"
                      (page)="onPageChange($event)"
                      showFirstLastButtons>
                    </mat-paginator>
                  </div>
                </div>
              </mat-tab>
              
              <!-- Technology Tab -->
              <mat-tab *ngFor="let category of getTechnologyCategory()" [label]="getCategoryName(category)">
                <div class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of getCategoryArticles(category.slug)">
                      <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-48 object-cover">
                      <mat-card-content>
                        <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                          {{ getCategoryName(article.category) }}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                        <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                          <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                            <ng-container *ngIf="isEnglish(); else hindiReadMore">
                              READ MORE →
                            </ng-container>
                            <ng-template #hindiReadMore>
                              और पढ़ें →
                            </ng-template>
                          </button>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  </div>
                  
                  <!-- No Articles Message -->
                  <div *ngIf="getCategoryArticles(category.slug).length === 0" class="text-center py-8">
                    <mat-icon class="text-gray-400 text-6xl mb-4">article</mat-icon>
                    <h3 class="text-lg font-semibold text-gray-600 mb-2">
                      <ng-container *ngIf="isEnglish(); else hindiNoArticles">
                        No articles in this category yet
                      </ng-container>
                      <ng-template #hindiNoArticles>
                        इस श्रेणी में अभी तक कोई लेख नहीं है
                      </ng-template>
                    </h3>
                    <p class="text-gray-500">
                      <ng-container *ngIf="isEnglish(); else hindiNoArticlesDesc">
                        Check back later for new content
                      </ng-container>
                      <ng-template #hindiNoArticlesDesc>
                        नई सामग्री के लिए बाद में वापस जांचें
                      </ng-template>
                    </p>
                  </div>
                </div>
              </mat-tab>

              <!-- Politics Tab -->
              <mat-tab *ngFor="let category of getPoliticsCategory()" [label]="getCategoryName(category)">
                <div class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of getCategoryArticles(category.slug)">
                      <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-48 object-cover">
                      <mat-card-content>
                        <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                          {{ getCategoryName(article.category) }}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                        <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                          <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                            <ng-container *ngIf="isEnglish(); else hindiReadMore">
                              READ MORE →
                            </ng-container>
                            <ng-template #hindiReadMore>
                              और पढ़ें →
                            </ng-template>
                          </button>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  </div>
                </div>
              </mat-tab>

              <!-- Business Tab -->
              <mat-tab *ngFor="let category of getBusinessCategory()" [label]="getCategoryName(category)">
                <div class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of getCategoryArticles(category.slug)">
                      <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-48 object-cover">
                      <mat-card-content>
                        <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                          {{ getCategoryName(article.category) }}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                        <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                          <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                            <ng-container *ngIf="isEnglish(); else hindiReadMore">
                              READ MORE →
                            </ng-container>
                            <ng-template #hindiReadMore>
                              और पढ़ें →
                            </ng-template>
                          </button>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  </div>
                </div>
              </mat-tab>

              <!-- Sports Tab -->
              <mat-tab *ngFor="let category of getSportsCategory()" [label]="getCategoryName(category)">
                <div class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of getCategoryArticles(category.slug)">
                      <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-48 object-cover">
                      <mat-card-content>
                        <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                          {{ getCategoryName(article.category) }}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                        <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                          <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                            <ng-container *ngIf="isEnglish(); else hindiReadMore">
                              READ MORE →
                            </ng-container>
                            <ng-template #hindiReadMore>
                              और पढ़ें →
                            </ng-template>
                          </button>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  </div>
                </div>
              </mat-tab>

              <!-- Entertainment Tab -->
              <mat-tab *ngFor="let category of getEntertainmentCategory()" [label]="getCategoryName(category)">
                <div class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of getCategoryArticles(category.slug)">
                      <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-48 object-cover">
                      <mat-card-content>
                        <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                          {{ getCategoryName(article.category) }}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                        <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                          <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                            <ng-container *ngIf="isEnglish(); else hindiReadMore">
                              READ MORE →
                            </ng-container>
                            <ng-template #hindiReadMore>
                              और पढ़ें →
                            </ng-template>
                          </button>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  </div>
                </div>
              </mat-tab>
            </mat-tab-group>
          </section>

          <!-- Latest News Grid -->
          <section class="mb-8">
            <div class="border-b-2 border-gray-300 mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                <ng-container *ngIf="isEnglish(); else hindiLatest">
                  LATEST NEWS
                </ng-container>
                <ng-template #hindiLatest>
                  नवीनतम समाचार
                </ng-template>
              </h2>
            </div>
            
            <!-- Ad Banner -->
            <div class="ad-space mb-6">
              <app-ad-banner position="leaderboard" size="728x90"></app-ad-banner>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- News Items -->
              <mat-card class="hover:shadow-lg transition-shadow" *ngFor="let article of featuredArticles.slice(4, 8)">
                <img mat-card-image [src]="article.featuredImage" [alt]="getArticleTitle(article)" class="w-full h-40 object-cover">
                <mat-card-content>
                  <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                    {{ getCategoryName(article.category) }}
                  </div>
                  <h3 class="font-bold text-gray-900 mb-2 text-sm">{{ getArticleTitle(article) }}</h3>
                  <p class="text-xs text-gray-600 mb-3">{{ getArticleExcerpt(article) }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{{ article.viewCount }} views</span>
                    <button mat-button color="primary" class="text-xs" (click)="readFullArticle(article)">
                      <ng-container *ngIf="isEnglish(); else hindiReadMore">
                        READ MORE →
                      </ng-container>
                      <ng-template #hindiReadMore>
                        और पढ़ें →
                      </ng-template>
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- Mobile Ad Banner -->
            <div class="ad-space mt-6 block md:hidden">
              <app-ad-banner position="mobile" size="320x100"></app-ad-banner>
            </div>
          </section>

          <!-- News Categories -->
          <section class="mb-8">
            <div class="border-b-2 border-gray-300 mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                <ng-container *ngIf="isEnglish(); else hindiCategories">
                  NEWS CATEGORIES
                </ng-container>
                <ng-template #hindiCategories>
                  समाचार श्रेणियां
                </ng-template>
              </h2>
            </div>
            
            <!-- Mobile Ad Banner -->
            <div class="block md:hidden mb-6">
              <app-ad-banner position="mobile" size="320x100"></app-ad-banner>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <mat-card class="text-center p-4 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer" 
                       (click)="selectCategory(category.slug)"
                       *ngFor="let category of categories">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                     [ngClass]="getCategoryColor(category.slug)">
                  <mat-icon class="text-white text-xl">{{ getCategoryIcon(category.slug) }}</mat-icon>
                </div>
                <h3 class="font-bold text-sm text-gray-900">{{ getCategoryName(category) }}</h3>
                <p class="text-xs text-gray-500 mt-1">{{ getCategoryArticles(category.slug).length }} articles</p>
              </mat-card>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Breaking News Banner */
    .breaking-news-banner {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      padding: 12px 0;
      overflow: hidden;
    }

    .breaking-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .breaking-label {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.2);
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap;
      animation: pulse 2s infinite;
    }

    .breaking-icon {
      font-size: 14px;
    }

    .breaking-text {
      font-size: 10px;
    }

    .breaking-ticker {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
    }

    .ticker-text {
      display: inline-block;
      animation: ticker 30s linear infinite;
      font-size: 14px;
      font-weight: 500;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @keyframes ticker {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    /* Tabs Styling */
    .news-tabs ::ng-deep .mat-mdc-tab-header {
      border-bottom: 2px solid #e5e7eb;
    }
    
    .news-tabs ::ng-deep .mat-mdc-tab-label {
      font-weight: 600;
      color: #6b7280;
      min-width: 120px;
    }
    
    .news-tabs ::ng-deep .mat-mdc-tab-label.mat-mdc-tab-label-active {
      color: #dc2626;
    }
    
    .news-tabs ::ng-deep .mat-mdc-tab-header-pagination {
      display: none;
    }

    .news-tabs ::ng-deep .mat-mdc-tab-header-pagination-chevron {
      display: none;
    }

    /* Ad Space Styling */
    .ad-space {
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .breaking-content {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }

      .breaking-label {
        align-self: center;
      }

      .breaking-ticker {
        width: 100%;
      }

      .ticker-text {
        font-size: 12px;
        animation-duration: 20s;
      }

      .news-tabs ::ng-deep .mat-mdc-tab-label {
        min-width: 80px;
        font-size: 12px;
        padding: 0 8px;
      }
    }

    @media (max-width: 480px) {
      .breaking-news-banner {
        padding: 8px 0;
      }

      .breaking-label {
        padding: 4px 8px;
        font-size: 10px;
      }

      .breaking-text {
        font-size: 9px;
      }

      .ticker-text {
        font-size: 11px;
        animation-duration: 15s;
      }

      .news-tabs ::ng-deep .mat-mdc-tab-label {
        min-width: 60px;
        font-size: 11px;
        padding: 0 4px;
      }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentLanguage$ = this.languageService.currentLanguage$;
  featuredArticles: Article[] = [];
  allArticles: Article[] = [];
  categories: Category[] = [];
  loading = true;
  error = false;

  // Pagination
  currentPage = 0;
  pageSize = 12;
  totalArticles = 0;
  selectedCategory = 'all';

  private languageSubscription: Subscription;

  constructor(
    private languageService: LanguageService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  async loadData() {
    try {
      this.loading = true;
      this.error = false;
      console.log('🔄 Loading news data from backend...');

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      // Create the data loading promise
      const dataPromise = Promise.all([
        firstValueFrom(this.apiService.getFeaturedArticles()),
        firstValueFrom(this.apiService.getArticles()),
        firstValueFrom(this.apiService.getCategories())
      ]);

      const [featuredArticles, allArticles, categories] = await Promise.race([dataPromise, timeoutPromise]) as [any[], any[], any[]];
      
      console.log('📦 Backend data received:', { 
        featuredArticles: featuredArticles?.length, 
        allArticles: allArticles?.length,
        categories: categories?.length 
      });

      // Verify Hindi data is present
      if (categories && categories.length > 0) {
        console.log('🌐 Hindi translations available:', {
          categories: categories.length,
          sampleCategory: categories[0].name + ' → ' + categories[0].nameHindi
        });
      }

      if (allArticles && allArticles.length > 0) {
        console.log('📰 Hindi translations available:', {
          articles: allArticles.length,
          sampleArticle: allArticles[0].title + ' → ' + allArticles[0].titleHindi
        });
      }
      
      this.featuredArticles = featuredArticles || [];
      this.allArticles = allArticles || [];
      this.categories = categories || [];
      this.totalArticles = this.allArticles.length;
      
      console.log('✅ All news data loaded successfully from backend');
    } catch (error) {
      console.error('❌ Error loading data from backend:', error);
      this.error = true;
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  get currentPageArticles(): Article[] {
    // For "All News" tab, show all articles with pagination
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.allArticles.slice(startIndex, endIndex);
  }

  getCategoryArticles(categorySlug: string): Article[] {
    // Filter articles by category slug
    return this.allArticles.filter(article => article.category.slug === categorySlug);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalArticles = event.length;
  }

  onCategoryChange(event: any): void {
    console.log('Category changed:', event);
    if (event.index === 0) {
      this.selectedCategory = 'all';
    } else {
      // Map tab index to category slug
      const categorySlugs = ['technology', 'politics', 'business', 'sports', 'entertainment'];
      this.selectedCategory = categorySlugs[event.index - 1] || 'all';
    }
    this.currentPage = 0; // Reset to first page when changing categories
    console.log('Selected category:', this.selectedCategory);
  }

  selectCategory(categorySlug: string): void {
    this.selectedCategory = categorySlug;
    // Find the tab index for this category
    const categorySlugs = ['technology', 'politics', 'business', 'sports', 'entertainment'];
    const categoryIndex = categorySlugs.indexOf(categorySlug);
    if (categoryIndex !== -1) {
      // Add 1 because index 0 is "All News"
      this.selectedCategory = categorySlug;
      console.log('Category selected via card:', categorySlug);
    }
  }

  getSelectedTabIndex(): number {
    if (this.selectedCategory === 'all') {
      return 0;
    } else {
      const categorySlugs = ['technology', 'politics', 'business', 'sports', 'entertainment'];
      const categoryIndex = categorySlugs.indexOf(this.selectedCategory);
      return categoryIndex !== -1 ? categoryIndex + 1 : 0;
    }
  }

  readFullArticle(article: Article): void {
    // Navigate to article detail page
    console.log('Reading full article:', article.title);
    this.router.navigate(['/article', article.slug]);
  }

  isEnglish(): boolean {
    return this.languageService.isEnglish();
  }

  isHindi(): boolean {
    return this.languageService.isHindi();
  }

  getArticleTitle(article: Article): string {
    const title = this.isEnglish() ? article.title : article.titleHindi;
    return title;
  }

  getArticleExcerpt(article: Article): string {
    const excerpt = this.isEnglish() ? article.excerpt : article.excerptHindi;
    return excerpt;
  }

  getCategoryName(category: Category): string {
    const name = this.isEnglish() ? category.name : category.nameHindi;
    return name;
  }

  getCategoryColor(slug: string): string {
    const colors = {
      politics: 'bg-red-600',
      business: 'bg-blue-600',
      sports: 'bg-green-600',
      entertainment: 'bg-purple-600',
      technology: 'bg-orange-600',
      health: 'bg-teal-600'
    };
    return colors[slug as keyof typeof colors] || 'bg-gray-600';
  }

  getCategoryIcon(slug: string): string {
    const icons = {
      politics: 'gavel',
      business: 'business',
      sports: 'sports_soccer',
      entertainment: 'movie',
      technology: 'computer',
      health: 'favorite'
    };
    return icons[slug as keyof typeof icons] || 'article';
  }

  getAllNewsLabel(): string {
    return this.isEnglish() ? 'All News' : 'सभी समाचार';
  }

  getTechnologyCategory(): Category[] {
    return this.categories.filter(category => category.slug === 'technology');
  }

  getPoliticsCategory(): Category[] {
    return this.categories.filter(category => category.slug === 'politics');
  }

  getBusinessCategory(): Category[] {
    return this.categories.filter(category => category.slug === 'business');
  }

  getSportsCategory(): Category[] {
    return this.categories.filter(category => category.slug === 'sports');
  }

  getEntertainmentCategory(): Category[] {
    return this.categories.filter(category => category.slug === 'entertainment');
  }
} 