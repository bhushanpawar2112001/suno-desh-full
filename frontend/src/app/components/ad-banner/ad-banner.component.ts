import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-banner" [class]="position">
      <div class="ad-content">
        <div class="ad-placeholder">
          <div class="ad-icon">📢</div>
          <div class="ad-text">
            <div class="ad-label">ADVERTISEMENT</div>
            <div class="ad-size">{{ size }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ad-banner {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      margin: 20px 0;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .ad-banner:hover {
      border-color: #adb5bd;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .ad-content {
      padding: 20px;
      text-align: center;
    }

    .ad-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .ad-icon {
      font-size: 32px;
      opacity: 0.6;
    }

    .ad-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .ad-label {
      font-size: 12px;
      font-weight: 600;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .ad-size {
      font-size: 14px;
      color: #495057;
      font-weight: 500;
    }

    /* Responsive sizes */
    .ad-banner.sidebar {
      min-height: 250px;
    }

    .ad-banner.leaderboard {
      min-height: 90px;
    }

    .ad-banner.rectangle {
      min-height: 250px;
    }

    .ad-banner.square {
      min-height: 300px;
      max-width: 300px;
      margin: 20px auto;
    }

    .ad-banner.mobile {
      min-height: 100px;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .ad-banner {
        margin: 15px 0;
      }
      
      .ad-content {
        padding: 15px;
      }
      
      .ad-icon {
        font-size: 24px;
      }
      
      .ad-label {
        font-size: 10px;
      }
      
      .ad-size {
        font-size: 12px;
      }
    }
  `]
})
export class AdBannerComponent {
  @Input() position: 'sidebar' | 'leaderboard' | 'rectangle' | 'square' | 'mobile' = 'rectangle';
  @Input() size: string = '300x250';

  get displaySize(): string {
    const sizes = {
      sidebar: '300x600',
      leaderboard: '728x90',
      rectangle: '300x250',
      square: '300x300',
      mobile: '320x100'
    };
    return sizes[this.position] || this.size;
  }
} 