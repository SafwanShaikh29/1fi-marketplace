import React from 'react';
import { MarketplaceBanner } from '../marketplace/MarketplaceBanner';
import { FilterToolbar } from '../marketplace/FilterToolbar';
import { ProductGrid } from '../marketplace/ProductGrid';
import { ProductDetailModal } from '../marketplace/ProductDetailModal';
import { CheckoutModal } from '../marketplace/CheckoutModal';

export const MarketplaceView: React.FC = () => {
  return (
    <div className="content-container">
      {/* 1Fi LAMF Value Proposition Hero */}
      <MarketplaceBanner />

      {/* Interactive Filter & Search Bar */}
      <FilterToolbar />

      {/* Product Catalog Grid (Handling Skeletons, Error Retry, Cards) */}
      <ProductGrid />

      {/* Interactive Product Variant & EMI Selector Modal */}
      <ProductDetailModal />

      {/* Digital Pledge & Checkout Multi-step Modal */}
      <CheckoutModal />
    </div>
  );
};
