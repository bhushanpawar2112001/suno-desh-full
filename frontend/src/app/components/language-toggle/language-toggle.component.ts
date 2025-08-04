import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button 
      mat-button 
      class="language-toggle-btn"
      (click)="toggleLanguage()"
      [class.active]="true">
      <span class="language-text">{{ getCurrentLanguageText() }}</span>
      <span class="language-icon">🌐</span>
    </button>
  `,
  styles: [`
    .language-toggle-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 14px;
    }

    .language-toggle-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .language-toggle-btn.active {
      background: rgba(255, 255, 255, 0.15);
    }

    .language-text {
      font-weight: 600;
    }

    .language-icon {
      font-size: 16px;
    }
  `]
})
export class LanguageToggleComponent {
  constructor(private languageService: LanguageService) {}

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getCurrentLanguageText(): string {
    return this.languageService.isEnglish() ? 'EN' : 'हिंदी';
  }
} 