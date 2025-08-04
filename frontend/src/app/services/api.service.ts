import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  _id: string;
  title: string;
  titleHindi: string;
  slug: string;
  content: string;
  contentHindi: string;
  excerpt: string;
  excerptHindi: string;
  featuredImage: string;
  category: Category;
  author: User;
  status: string;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  descriptionHindi: string;
  isActive: boolean;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface CreateArticleDto {
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  excerpt: string;
  excerptHindi: string;
  categoryId: string;
  featuredImage: string;
  status: string;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
}

export interface CreateCategoryDto {
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  isActive: boolean;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Articles
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`);
  }

  getFeaturedArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles/featured`);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`);
  }

  getArticleBySlug(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/slug/${slug}`);
  }

  getArticlesByCategory(categorySlug: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?category=${categorySlug}`);
  }

  createArticle(article: CreateArticleDto): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/articles`, article);
  }

  updateArticle(id: string, article: Partial<CreateArticleDto>): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/articles/${id}`, article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/articles/${id}`);
  }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/slug/${slug}`);
  }

  createCategory(category: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(id: string, category: Partial<CreateCategoryDto>): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(id: string, user: Partial<CreateUserDto>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  // Authentication
  login(credentials: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.baseUrl}/auth/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/logout`, {});
  }

  // Increment view count
  incrementViewCount(articleId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/articles/${articleId}/view`, {});
  }

  // Dashboard stats
  getDashboardStats(): Observable<{
    totalArticles: number;
    totalCategories: number;
    totalUsers: number;
    totalViews: number;
    recentArticles: Article[];
    topArticles: Article[];
  }> {
    return this.http.get<{
      totalArticles: number;
      totalCategories: number;
      totalUsers: number;
      totalViews: number;
      recentArticles: Article[];
      topArticles: Article[];
    }>(`${this.baseUrl}/dashboard/stats`);
  }
} 