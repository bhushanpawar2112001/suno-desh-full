import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatBadgeModule, MatDividerModule],
  template: `
    <mat-sidenav-container class="h-screen bg-gray-50">
      <!-- Sidebar -->
      <mat-sidenav #sidenav mode="side" opened class="w-64 bg-white shadow-lg">
        <div class="p-6">
          <!-- Logo -->
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <mat-icon class="text-white">admin_panel_settings</mat-icon>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800">NewsHub</h2>
              <p class="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="space-y-2">
            <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="bg-blue-50 text-blue-700 border-r-4 border-blue-700" class="rounded-lg mb-1 transition-all duration-200">
              <mat-icon matListItemIcon class="text-gray-600">dashboard</mat-icon>
              <span matListItemTitle class="font-medium">Dashboard</span>
            </a>
            
            <a mat-list-item routerLink="/admin/articles" routerLinkActive="bg-blue-50 text-blue-700 border-r-4 border-blue-700" class="rounded-lg mb-1 transition-all duration-200">
              <mat-icon matListItemIcon class="text-gray-600">article</mat-icon>
              <span matListItemTitle class="font-medium">Articles</span>
            </a>
            
            <a mat-list-item routerLink="/admin/categories" routerLinkActive="bg-blue-50 text-blue-700 border-r-4 border-blue-700" class="rounded-lg mb-1 transition-all duration-200">
              <mat-icon matListItemIcon class="text-gray-600">category</mat-icon>
              <span matListItemTitle class="font-medium">Categories</span>
            </a>
            
            <a mat-list-item routerLink="/admin/users" routerLinkActive="bg-blue-50 text-blue-700 border-r-4 border-blue-700" class="rounded-lg mb-1 transition-all duration-200">
              <mat-icon matListItemIcon class="text-gray-600">people</mat-icon>
              <span matListItemTitle class="font-medium">Users</span>
            </a>
          </nav>

          <!-- Quick Stats -->
          <div class="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Articles</span>
                <span class="font-semibold text-gray-800">24</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Categories</span>
                <span class="font-semibold text-gray-800">6</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Users</span>
                <span class="font-semibold text-gray-800">12</span>
              </div>
            </div>
          </div>
        </div>
      </mat-sidenav>

      <!-- Main Content -->
      <mat-sidenav-content class="bg-gray-50">
        <!-- Top Toolbar -->
        <mat-toolbar class="bg-white shadow-sm border-b border-gray-200">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-4">
              <button mat-icon-button (click)="sidenav.toggle()" class="text-gray-600">
                <mat-icon>menu</mat-icon>
              </button>
              <div class="hidden md:block">
                <h1 class="text-lg font-semibold text-gray-800">NewsHub Administration</h1>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <!-- Notifications -->
              <button mat-icon-button class="relative">
                <mat-icon class="text-gray-600">notifications</mat-icon>
                <mat-icon class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">3</mat-icon>
              </button>

              <!-- User Menu -->
              <button mat-button [matMenuTriggerFor]="userMenu" class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">A</span>
                </div>
                <span class="hidden md:block text-gray-700">{{ userInfo?.name || 'Admin User' }}</span>
                <mat-icon class="text-gray-600">arrow_drop_down</mat-icon>
              </button>

              <mat-menu #userMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon>person</mat-icon>
                  <span>Profile</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>settings</mat-icon>
                  <span>Settings</span>
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="logout()">
                  <mat-icon>logout</mat-icon>
                  <span>Logout</span>
                </button>
              </mat-menu>
            </div>
          </div>
        </mat-toolbar>

        <!-- Page Content -->
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    mat-sidenav-container {
      height: 100vh;
    }

    mat-sidenav {
      border-right: 1px solid #e5e7eb;
    }

    mat-list-item {
      margin: 4px 0;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    mat-list-item:hover {
      background-color: #f3f4f6;
    }

    mat-list-item.router-link-active {
      background-color: #eff6ff;
      color: #1d4ed8;
      border-right: 4px solid #1d4ed8;
    }

    mat-list-item.router-link-active mat-icon {
      color: #1d4ed8;
    }

    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .quick-stats {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  `]
})
export class AdminComponent {
  userInfo: any = null;

  constructor() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
    }
  }

  logout() {
    // Clear all stored data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '/login';
  }
} 