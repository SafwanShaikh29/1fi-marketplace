import React from 'react';
import { Sparkles, Zap, TrendingUp, ShieldCheck, Tag } from 'lucide-react';

export const MarketplaceBanner: React.FC = () => {
  return (
    <div className="marketplace-hero-banner">
      <div className="hero-pill-tag">
        <Sparkles size={14} />
        <span>India's First LAMF Shopping Platform</span>
      </div>

      <h2 className="hero-title-main">
        Shop today. <span className="hero-gradient-text">Pay later using mutual funds.</span>
      </h2>

      <p className="hero-subtitle">
        Buy what you love without selling your investments. Your mutual funds remain invested 
        and continue compounding while you enjoy life with 0% No-Cost EMIs.
      </p>

      <div className="hero-benefits-grid">
        <div className="benefit-chip">
          <div className="benefit-chip-icon">
            <Tag size={18} />
          </div>
          <div>
            <div className="benefit-chip-text">0% Interest EMIs</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No hidden interest fees</div>
          </div>
        </div>

        <div className="benefit-chip">
          <div className="benefit-chip-icon">
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="benefit-chip-text">Continue Compounding</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Earn ~14% CAGR while borrowing</div>
          </div>
        </div>

        <div className="benefit-chip">
          <div className="benefit-chip-icon">
            <Zap size={18} />
          </div>
          <div>
            <div className="benefit-chip-text">Instant Approval</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>10-second CAMS / KFin pledge</div>
          </div>
        </div>

        <div className="benefit-chip">
          <div className="benefit-chip-icon">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="benefit-chip-text">Zero Downpayment</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Zero foreclosure penalty</div>
          </div>
        </div>
      </div>
    </div>
  );
};
