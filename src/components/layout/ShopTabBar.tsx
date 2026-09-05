import React from 'react';
import { ShoppingBag, Store, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import type { ShopTab } from '../../types/marketplace';

export const ShopTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useMarketplace();

  const tabs: Array<{ id: ShopTab; label: string; icon: React.ReactNode; badge?: string }> = [
    {
      id: 'top_brands',
      label: 'Top Brands',
      icon: <ShoppingBag size={18} />,
      badge: 'Placeholder'
    },
    {
      id: 'nearby_stores',
      label: 'Nearby Stores',
      icon: <Store size={18} />,
      badge: 'Placeholder'
    },
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      icon: <Sparkles size={18} />,
      badge: '0% Interest EMI'
    }
  ];

  return (
    <div className="shop-tab-bar-wrap" id="shop-section">
      <div className="content-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
              1Fi Shop Experience
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Choose your preferred shopping destination with mutual-fund backed liquidity.
            </p>
          </div>
        </div>

        <div className="shop-tab-bar">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`shop-tab-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && <span className="shop-tab-badge">{tab.badge}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
