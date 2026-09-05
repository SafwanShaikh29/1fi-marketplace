import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const TopBrandsView: React.FC = () => {
  const { setActiveTab } = useMarketplace();

  return (
    <div className="content-container">
      <div className="state-container-card">
        <div className="state-icon-circle empty">
          <ShoppingBag size={32} />
        </div>
        <h2 className="state-title">Top Brands Directory</h2>
        <p className="state-desc">
          Per technical requirements, no implementation is required for the <strong>Top Brands</strong> section. 
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
