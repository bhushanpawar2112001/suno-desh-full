import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <div class="header-wrapper">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="container">
          <div class="top-bar-content">
            <div class="weather-info">
              <span class="weather-icon">🌤️</span>
              <span class="weather-text">28°C, Sunny</span>
            </div>
            <div class="top-actions">
              <button class="language-toggle" (click)="toggleLanguage()">
                <span class="lang-text">{{ getCurrentLanguageText() }}</span>
                <span class="lang-icon">🌐</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <header class="main-header">
        <div class="container">
          <div class="header-content">
            <!-- Logo Section -->
            <div class="logo-section">
              <a routerLink="/" class="logo-link">
                <div class="logo-container">
                  <div class="logo-icon">📰</div>
                  <div class="logo-text">
                    <h1 class="logo-title">
                      <ng-container *ngIf="isEnglish(); else hindiLogo">
                        SUNODESH
                      </ng-container>
                      <ng-template #hindiLogo>
                        सुनोदेश
                      </ng-template>
                    </h1>
                    <p class="logo-subtitle">
                      <ng-container *ngIf="isEnglish(); else hindiSubtitle">
                        Your Trusted News Source
                      </ng-container>
                      <ng-template #hindiSubtitle>
                        आपका विश्वसनीय समाचार स्रोत
                      </ng-template>
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <!-- Search Section -->
            <div class="search-section">
              <div class="search-container">
                <input type="text" placeholder="Search news..." class="search-input">
                <button class="search-btn">
                  <mat-icon>search</mat-icon>
                </button>
              </div>
            </div>

            <!-- User Section -->
            <div class="user-section">
              <button class="notification-btn">
                <mat-icon>notifications</mat-icon>
                <span class="notification-badge">
                  <ng-container *ngIf="isEnglish(); else hindiNotification">
                    3
                  </ng-container>
                  <ng-template #hindiNotification>
                    ३
                  </ng-template>
                </span>
              </button>
              <button class="user-menu-btn">
                <mat-icon>account_circle</mat-icon>
              </button>
            </div>

            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation -->
      <div *ngIf="mobileMenuOpen" class="mobile-nav">
        <div class="mobile-nav-content">
          <div class="mobile-search">
            <input type="text" placeholder="Search news..." class="mobile-search-input">
            <button class="mobile-search-btn">
              <mat-icon>search</mat-icon>
            </button>
          </div>
          <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
              <a routerLink="/" class="mobile-nav-link" (click)="closeMobileMenu()">
                <mat-icon>home</mat-icon>
                <span>
                  <ng-container *ngIf="isEnglish(); else hindiHomeMobile">
                    HOME
                  </ng-container>
                  <ng-template #hindiHomeMobile>
                    होम
                  </ng-template>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header-wrapper {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: white;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Top Bar */
    .top-bar {
      background: linear-gradient(135deg, #f8fafc, #e2e8f0);
      padding: 10px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .top-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .weather-info {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #475569;
      font-size: 14px;
      font-weight: 500;
    }

    .weather-icon {
      font-size: 20px;
    }

    .top-actions {
      display: flex;
      gap: 10px;
    }

    .language-toggle {
      background: none;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 8px 15px;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .language-toggle:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
    }

    .lang-text {
      font-size: 14px;
      font-weight: 600;
      color: #475569;
    }

    .lang-icon {
      font-size: 18px;
      color: #3b82f6;
    }

    /* Main Header */
    .main-header {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      padding: 20px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .header-content {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 30px;
      align-items: center;
    }

    /* Logo Section */
    .logo-link {
      text-decoration: none;
      color: inherit;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .logo-icon {
      font-size: 40px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
      animation: logoBounce 3s ease-in-out infinite;
    }

    @keyframes logoBounce {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-5px) rotate(2deg); }
      75% { transform: translateY(-3px) rotate(-1deg); }
    }

    .logo-title {
      font-size: 32px;
      font-weight: 900;
      background: linear-gradient(135deg, #1e293b, #475569);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0;
      letter-spacing: 2px;
    }

    .logo-subtitle {
      font-size: 12px;
      color: #64748b;
      margin: 0;
      font-weight: 500;
      letter-spacing: 1px;
    }

    /* Search Section */
    .search-container {
      position: relative;
      width: 400px;
    }

    .search-input {
      width: 100%;
      padding: 12px 50px 12px 20px;
      border: 2px solid #e2e8f0;
      border-radius: 25px;
      font-size: 14px;
      background: white;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-btn {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-btn:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    /* User Section */
    .user-section {
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: flex-end;
    }

    .notification-btn {
      position: relative;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notification-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .user-menu-btn {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
      color: white !important;
      border-radius: 50% !important;
      width: 45px !important;
      height: 45px !important;
      transition: all 0.3s ease !important;
    }

    .user-menu-btn:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3) !important;
    }

    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
    }

    .mobile-menu-btn span {
      width: 25px;
      height: 3px;
      background: #1e293b;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .mobile-menu-btn:hover span {
      background: #3b82f6;
    }

    /* Mobile Navigation */
    .mobile-nav {
      background: white;
      border-top: 1px solid #e2e8f0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .mobile-nav-content {
      padding: 20px;
    }

    .mobile-search {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .mobile-search-input {
      flex: 1;
      padding: 12px 15px;
      border: 2px solid #e2e8f0;
      border-radius: 25px;
      font-size: 14px;
    }

    .mobile-search-btn {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .mobile-nav-item {
      background: linear-gradient(135deg, #f8fafc, #e2e8f0);
      border-radius: 12px;
      overflow: hidden;
    }

    .mobile-nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px 15px;
      color: #374151;
      text-decoration: none;
      transition: all 0.3s ease;
      text-align: center;
    }

    .mobile-nav-link:hover {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .mobile-nav-link mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .mobile-nav-link span {
      font-size: 12px;
      font-weight: 600;
    }

    /* User Menu */
    .user-menu {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .menu-item {
      border-radius: 8px;
      margin: 4px;
      transition: all 0.3s ease;
    }

    .menu-item:hover {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .container {
        padding: 0 15px;
      }
      
      .search-container {
        width: 300px;
      }
      
      .logo-title {
        font-size: 28px;
      }
      
      .logo-icon {
        font-size: 35px;
      }
    }

    @media (max-width: 768px) {
      .header-content {
        grid-template-columns: 1fr auto;
        gap: 15px;
      }

      .search-section {
        display: none;
      }

      .user-section {
        gap: 10px;
      }

      .logo-title {
        font-size: 24px;
      }

      .logo-subtitle {
        font-size: 10px;
      }

      .nav-list {
        display: none;
      }

      .mobile-menu-btn {
        display: flex;
      }

      .top-bar-content {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }

      .weather-info {
        font-size: 12px;
      }

      .language-toggle {
        padding: 6px 12px;
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0 10px;
      }

      .logo-container {
        gap: 8px;
      }

      .logo-icon {
        font-size: 28px;
      }

      .logo-title {
        font-size: 20px;
        letter-spacing: 1px;
      }
      
      .logo-subtitle {
        font-size: 9px;
      }

      .mobile-nav-list {
        grid-template-columns: 1fr;
      }
      
      .mobile-nav-content {
        padding: 15px;
      }
      
      .mobile-nav-link {
        padding: 15px 10px;
      }
      
      .mobile-nav-link mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
      
      .mobile-nav-link span {
        font-size: 11px;
      }
      
      .notification-btn, .user-menu-btn {
        width: 40px !important;
        height: 40px !important;
      }
      
      .notification-badge {
        width: 18px;
        height: 18px;
        font-size: 9px;
      }

      .top-bar {
        padding: 8px 0;
      }

      .weather-info {
        font-size: 11px;
      }

      .weather-icon {
        font-size: 16px;
      }

      .language-toggle {
        padding: 5px 10px;
      }

      .lang-text {
        font-size: 12px;
      }

      .lang-icon {
        font-size: 16px;
      }
    }

    @media (max-width: 360px) {
      .logo-title {
        font-size: 18px;
      }
      
      .logo-icon {
        font-size: 24px;
      }
      
      .logo-subtitle {
        font-size: 8px;
      }

      .weather-info {
        font-size: 10px;
      }

      .language-toggle {
        padding: 4px 8px;
      }

      .lang-text {
        font-size: 11px;
      }
    }
  `]
})
export class HeaderComponent implements OnDestroy {
  mobileMenuOpen = false;
  private languageSubscription: Subscription;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getCurrentLanguageText(): string {
    return this.languageService.isEnglish() ? 'EN' : 'हिंदी';
  }

  isEnglish(): boolean {
    return this.languageService.isEnglish();
  }
} 