import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const partners = [
    'Tata Capital',
    'DSP Finance',
    'KFintech',
    'CAMS',
    'Bajaj Finserv',
    'DigiLocker'
  ];

  return (
    <footer className="app-footer">
      <div className="content-container">
        {/* Ecosystem Partners Strip */}
        <div className="footer-partners-banner">
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              Trusted Ecosystem & Regulatory Partners
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Powering instant digital pledging and secure credit lines against mutual funds
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {partners.map(p => (
              <span
                key={p}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#d1d5db',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px'
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div className="brand-logo-icon" style={{ width: '32px', height: '32px', fontSize: '1rem' }}>1Fi</div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>1Fi</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#9ca3af', lineHeight: 1.6 }}>
              India's first LAMF-based shopping platform. Buy what you love without selling your investments. Keep your wealth growing while you enjoy life today.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>Shop & Categories</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
              <li><a href="#shop" style={{ color: 'inherit' }}>Smartphones</a></li>
              <li><a href="#shop" style={{ color: 'inherit' }}>Laptops & MacBooks</a></li>
              <li><a href="#shop" style={{ color: 'inherit' }}>Studio Audio & Headphones</a></li>
              <li><a href="#shop" style={{ color: 'inherit' }}>Smart Wearables</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>Loan Against Mutual Funds</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
              <li><span>0% No-Cost EMI</span></li>
              <li><span>Instant CAMS / KFintech Pledging</span></li>
              <li><span>Zero Pre-closure Penalty</span></li>
              <li><span>Keep Earning Portfolio Returns</span></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>Security & Compliance</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#10B981" />
                <span>RBI Regulated Lending NBFCs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={16} color="#10B981" />
                <span>256-bit Bank-Grade Encryption</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ExternalLink size={16} color="#6C28D9" />
                <span>Direct integration with MFCentral</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} 1Fi (OneFi Technologies Pvt Ltd). All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" style={{ color: '#9ca3af' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#9ca3af' }}>Terms of Service</a>
            <a href="#grievance" style={{ color: '#9ca3af' }}>Grievance Redressal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
