import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Users Management</h1>
        <div class="flex gap-3">
          <button mat-raised-button color="primary" (click)="createUser()">
            <mat-icon class="mr-2">person_add</mat-icon>
            Add User
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
                <mat-icon>people</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-xl font-semibold text-gray-900">{{ users.length }}</p>
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
                <mat-icon>admin_panel_settings</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Admins</p>
                <p class="text-xl font-semibold text-gray-900">{{ getAdminCount() }}</p>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="card">
          <div class="p-4">
            <div class="flex items-center">
              <div class="p-2 rounded-full bg-orange-100 text-orange-600">
                <mat-icon>edit</mat-icon>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-600">Editors</p>
                <p class="text-xl font-semibold text-gray-900">{{ getEditorCount() }}</p>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Users Table -->
      <mat-card *ngIf="!loading" class="card">
        <mat-card-content class="p-0">
          <table mat-table [dataSource]="users" class="w-full">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Name</th>
              <td mat-cell *matCellDef="let user" class="px-4 py-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</h4>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Role Column -->
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Role</th>
              <td mat-cell *matCellDef="let user" class="px-4 py-3">
                <mat-chip [color]="getRoleColor(user.role)" selected>{{ user.role }}</mat-chip>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Status</th>
              <td mat-cell *matCellDef="let user" class="px-4 py-3">
                <span [class]="user.isActive ? 'status-active' : 'status-inactive'">
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </ng-container>

            <!-- Joined Column -->
            <ng-container matColumnDef="joined">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Joined</th>
              <td mat-cell *matCellDef="let user" class="px-4 py-3">
                <div>
                  <p class="text-sm text-gray-900">{{ user.createdAt | date:'MMM d, y' }}</p>
                  <p class="text-xs text-gray-500">{{ user.createdAt | date:'HH:mm' }}</p>
                </div>
              </td>
            </ng-container>

            <!-- Last Login Column -->
            <ng-container matColumnDef="lastLogin">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Last Login</th>
              <td mat-cell *matCellDef="let user" class="px-4 py-3">
                <div>
                  <p class="text-sm text-gray-900">{{ user.lastLoginAt ? (user.lastLoginAt | date:'MMM d, y') : 'Never' }}</p>
                  <p class="text-xs text-gray-500">{{ user.lastLoginAt ? (user.lastLoginAt | date:'HH:mm') : '' }}</p>
                </div>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-3">Actions</th>
              <td mat-cell *matCellDef="let user" class="px-4 py-3">
                <div class="flex items-center space-x-2">
                  <button mat-icon-button color="primary" (click)="viewUser(user)" matTooltip="View User">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" (click)="editUser(user)" matTooltip="Edit User">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteUser(user)" matTooltip="Delete User">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-gray-50"></tr>
          </table>

          <!-- Empty State -->
          <div *ngIf="users.length === 0" class="text-center py-12">
            <mat-icon class="text-6xl text-gray-300 mb-4">people</mat-icon>
            <h3 class="text-lg font-semibold text-gray-600 mb-2">No Users Found</h3>
            <p class="text-gray-500 mb-4">Get started by adding your first user</p>
            <button mat-raised-button color="primary" (click)="createUser()">
              <mat-icon class="mr-2">person_add</mat-icon>
              Add First User
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
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'status', 'joined', 'lastLogin', 'actions'];
  users: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.loading = true;
      this.users = await firstValueFrom(this.apiService.getUsers());
    } catch (error) {
      console.error('Error loading users:', error);
      this.snackBar.open('Error loading users', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  async refreshData() {
    await this.loadUsers();
  }

  getActiveCount(): number {
    return this.users.filter(user => user.isActive).length;
  }

  getAdminCount(): number {
    return this.users.filter(user => user.role === 'admin').length;
  }

  getEditorCount(): number {
    return this.users.filter(user => user.role === 'editor').length;
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'warn';
      case 'editor': return 'accent';
      case 'user': return 'primary';
      default: return 'primary';
    }
  }

  createUser() {
    this.router.navigate(['/admin/users/create']);
  }

  viewUser(user: any) {
    this.router.navigate(['/admin/users/view', user._id]);
  }

  editUser(user: any) {
    this.router.navigate(['/admin/users/edit', user._id]);
  }

  async deleteUser(user: any) {
    const confirmed = confirm(`Are you sure you want to delete "${user.firstName} ${user.lastName}"?`);
    if (confirmed) {
      try {
        await firstValueFrom(this.apiService.deleteUser(user._id));
        this.users = this.users.filter(u => u._id !== user._id);
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
      } catch (error) {
        console.error('Error deleting user:', error);
        this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
      }
    }
  }
} 