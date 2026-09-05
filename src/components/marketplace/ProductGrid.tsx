import React from 'react';
import { AlertCircle, RefreshCw, SearchX } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { products, isLoading, error, retryFetch, resetFilters, filters } = useMarketplace();

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="products-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="product-card" style={{ height: '480px', padding: '1.25rem' }}>
            <div className="skeleton-pulse" style={{ height: '200px', width: '100%', marginBottom: '1rem' }} />
            <div className="skeleton-pulse" style={{ height: '16px', width: '40%', marginBottom: '0.75rem' }} />
            <div className="skeleton-pulse" style={{ height: '24px', width: '80%', marginBottom: '0.75rem' }} />
            <div className="skeleton-pulse" style={{ height: '36px', width: '100%', marginBottom: '1rem' }} />
            <div className="skeleton-pulse" style={{ height: '60px', width: '100%', marginBottom: '1rem' }} />
            <div className="skeleton-pulse" style={{ height: '44px', width: '100%', marginTop: 'auto' }} />
          </div>
        ))}
      </div>
    );
  }

  // Error State with Retry
  if (error) {
    return (
      <div className="state-container-card" style={{ borderColor: 'var(--danger-border)' }}>
        <div className="state-icon-circle error">
          <AlertCircle size={32} />
        </div>
        <h3 className="state-title" style={{ color: 'var(--danger-text)' }}>Failed to Load Marketplace Products</h3>
        <p className="state-desc">{error}</p>
        <button className="btn-1fi-primary" onClick={retryFetch}>
          <RefreshCw size={16} /> Retry Connection
        </button>
      </div>
    );
  }

  // Empty Results State
  if (products.length === 0) {
    return (
      <div className="state-container-card">
        <div className="state-icon-circle empty">
          <SearchX size={32} />
        </div>
        <h3 className="state-title">No Matching Products Found</h3>
        <p className="state-desc">
          We couldn't find any products matching your query 
          {filters.searchQuery ? ` "${filters.searchQuery}"` : ''} 
          {filters.category !== 'All' ? ` in ${filters.category}` : ''}.
        </p>
        <button className="btn-1fi-primary" onClick={resetFilters}>
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Showing <strong>{products.length}</strong> {products.length === 1 ? 'product' : 'products'} backed by Mutual Funds
        </span>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
