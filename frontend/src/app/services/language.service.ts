import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'hi';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('preferredLanguage', language);
  }

  toggleLanguage(): void {
    const current = this.getCurrentLanguage();
    const newLanguage: Language = current === 'en' ? 'hi' : 'en';
    console.log('🔄 Language switched:', current + ' → ' + newLanguage);
    this.setLanguage(newLanguage);
  }

  isEnglish(): boolean {
    return this.getCurrentLanguage() === 'en';
  }

  isHindi(): boolean {
    return this.getCurrentLanguage() === 'hi';
  }
} 