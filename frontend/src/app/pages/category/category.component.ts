import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ categoryName }}</h1>
          <p class="text-lg text-gray-600">{{ categoryDescription }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <mat-card class="card hover:shadow-lg transition-shadow duration-300" *ngFor="let article of articles">
            <img mat-card-image src="https://via.placeholder.com/400x250" alt="Article image">
            <mat-card-content class="p-6">
              <mat-chip-listbox>
                <mat-chip-option color="primary" selected>{{ categoryName }}</mat-chip-option>
              </mat-chip-listbox>
              <h3 class="text-xl font-semibold mt-4 mb-2">{{ article.title }}</h3>
              <p class="text-gray-600 mb-4">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">By {{ article.author }} • {{ article.date }}</span>
                <button mat-button color="primary" [routerLink]="['/article', article.slug]">
                  Read More
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CategoryComponent {
  categoryName = 'Technology';
  categoryDescription = 'Latest technology news, innovations, and updates from around the world.';
  
  articles = [
    {
      title: 'AI Breakthrough in Healthcare',
      excerpt: 'Revolutionary AI technology promises to transform medical diagnosis and treatment...',
      author: 'John Doe',
      date: '2 hours ago',
      slug: 'ai-breakthrough'
    },
    {
      title: 'Quantum Computing Milestone',
      excerpt: 'Scientists achieve major breakthrough in quantum computing research...',
      author: 'Jane Smith',
      date: '4 hours ago',
      slug: 'quantum-computing'
    },
    {
      title: '5G Network Expansion',
      excerpt: 'Global 5G network coverage reaches new milestones...',
      author: 'Mike Johnson',
      date: '6 hours ago',
      slug: '5g-expansion'
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      // Load category data based on slug
      this.loadCategoryData(slug);
    });
  }

  private loadCategoryData(slug: string) {
    // Load category and articles data from API
    // This would typically call a service
  }
} 