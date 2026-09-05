import React, { useState } from 'react';
import { ShieldCheck, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Navbar: React.FC = () => {
  const { userPortfolio, showToast } = useMarketplace();
  const [showPortfolioDropdown, setShowPortfolioDropdown] = useState(false);

  return (
    <header className="navbar-fixed">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="brand-logo-wrap" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo-icon">1Fi</div>
          <span className="brand-logo-text">1Fi</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          <a href="#home" className="nav-link-item">Home</a>
          <a href="#about" className="nav-link-item">About Us</a>
          <a href="#how-it-works" className="nav-link-item">How it Works</a>
          <a href="#shop" className="nav-link-item active">Shop</a>
          <a href="#calculator" className="nav-link-item">Calculator</a>
          <a href="#faqs" className="nav-link-item">FAQs</a>
        </nav>

        {/* Right side: Portfolio Credit Line Widget & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
          {/* Mutual Fund Eligible Credit Limit Pill */}
          <div
            className="portfolio-chip-header"
            onClick={() => setShowPortfolioDropdown(prev => !prev)}
            title="View Mutual Fund Backed Credit Limit"
          >
            <div className="portfolio-badge-indicator"></div>
            <div>
              <div className="portfolio-chip-label">Eligible Credit Limit</div>
              <div className="portfolio-chip-amount">
                ₹{userPortfolio.eligibleCreditLimit.toLocaleString('en-IN')}
              </div>
            </div>
            <ChevronDown size={14} color="#6C28D9" />
          </div>

          {/* Portfolio quick dropdown */}
          {showPortfolioDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '320px',
                background: '#ffffff',
                border: '1px solid var(--border-brand)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                padding: '1.25rem',
                zIndex: 60,
                animation: 'fadeIn 150ms ease-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Your Mutual Funds</span>
                <span style={{ fontSize: '0.75rem', color: '#047857', background: '#ecfdf5', padding: '0.15rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                  <ShieldCheck size={12} style={{ display: 'inline', marginRight: '3px' }} /> Verified CAMS/KFin
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                Total Portfolio: <strong style={{ color: 'var(--text-main)' }}>₹{userPortfolio.totalPortfolioValue.toLocaleString('en-IN')}</strong>
                <br />
                Pledgeable Value (50%): <strong style={{ color: 'var(--primary-purple)' }}>₹{userPortfolio.eligibleCreditLimit.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                {userPortfolio.holdings.map(h => (
                  <div key={h.id} style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{h.fundName}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                      <span>Value: ₹{h.totalValue.toLocaleString('en-IN')}</span>
                      <span style={{ color: '#047857', fontWeight: 600 }}>+{h.cagr3Yr}% 3Y CAGR</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn-1fi-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                onClick={() => {
                  setShowPortfolioDropdown(false);
                  showToast('Portfolio verified! You can shop products up to ₹2,70,000 without selling funds.', 'success');
                }}
              >
                Use Limit on Marketplace
              </button>
            </div>
          )}

          {/* Shop CTA */}
          <button
            className="btn-1fi-primary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.875rem' }}
            onClick={() => {
              const el = document.getElementById('shop-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Shop Now <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
