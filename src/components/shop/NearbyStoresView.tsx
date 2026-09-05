import React from 'react';
import { Store, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const NearbyStoresView: React.FC = () => {
  const { setActiveTab } = useMarketplace();

  return (
    <div className="content-container">
      <div className="state-container-card">
        <div className="state-icon-circle empty">
          <Store size={32} />
        </div>
        <h2 className="state-title">Nearby Stores Locator</h2>
        <p className="state-desc">
          Per technical requirements, no implementation is required for the <strong>Nearby Stores</strong> section. 
          This section remains cleanly unpopulated.
        </p>
        <button
          className="btn-1fi-primary"
          onClick={() => setActiveTab('marketplace')}
        >
          Explore 1Fi Marketplace <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
