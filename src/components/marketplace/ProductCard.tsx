import React, { useState } from 'react';
import { Star, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '../../types/marketplace';
import { useMarketplace } from '../../context/MarketplaceContext';
import { marketplaceApi } from '../../services/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail } = useMarketplace();
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Get lowest EMI option dynamically
  const emiOptions = marketplaceApi.getAllEmiOptions(product, 0);
  const lowestEmi = emiOptions.reduce(
    (min, cur) => (cur.monthlyAmount < min.monthlyAmount ? cur : min),
    emiOptions[0]
  );

  const activeImage = product.colors[activeColorIdx]?.image || product.colors[0]?.image;

  return (
    <div className="product-card">
      {/* Product Image Area */}
      <div className="product-image-wrap">
        {/* Badges */}
        <div className="product-badges-wrap">
          {product.badge && (
            <span className="badge-pill-zerocost">
              {product.badge}
            </span>
          )}
          {product.isBestSeller && (
            <span className="badge-pill-featured">
              <Sparkles size={11} /> Best Seller
            </span>
          )}
        </div>

        <img
          src={activeImage}
          alt={product.name}
          className="product-image-main"
          loading="lazy"
        />
      </div>

      {/* Card Content Body */}
      <div className="product-card-body">
        {/* Brand & Rating */}
        <div className="product-brand-rating-row">
          <span className="product-brand-name">{product.brand}</span>
          <div className="product-rating-tag">
            <Star size={12} fill="#F59E0B" color="#F59E0B" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.7rem' }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <h3 className="product-title">{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>

        {/* Color Swatches */}
        <div className="variant-preview-row">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Colors:</span>
          {product.colors.map((c, idx) => (
            <button
              key={c.name}
              className="variant-color-dot"
              style={{
                backgroundColor: c.hex,
                outline: activeColorIdx === idx ? '2px solid var(--primary-purple)' : 'none',
                outlineOffset: '2px',
                cursor: 'pointer'
              }}
              title={c.name}
              onClick={e => {
                e.stopPropagation();
                setActiveColorIdx(idx);
              }}
            />
          ))}
          <span className="variant-specs-count">
            {product.specs.length} {product.specs.length === 1 ? 'Spec' : 'Specs'}
          </span>
        </div>

        {/* Pricing Row */}
        <div className="product-price-row">
          <span className="price-current">₹{product.basePrice.toLocaleString('en-IN')}</span>
          <span className="price-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
          <span className="price-discount-tag">
            {Math.round(((product.mrp - product.basePrice) / product.mrp) * 100)}% OFF
          </span>
        </div>

        {/* Highlighted EMI Box (1Fi Special) */}
        <div className="emi-highlight-box">
          <div className="emi-highlight-header">Mutual Fund Backed EMI</div>
          <div className="emi-highlight-amount">
            ₹{lowestEmi.monthlyAmount.toLocaleString('en-IN')}
            <span className="emi-highlight-tenure">/mo for {lowestEmi.tenureMonths} mos</span>
          </div>
          <div className="emi-mf-tag">
            <ShieldCheck size={12} color="#047857" />
            <span>0% Interest • No Downpayment</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="btn-1fi-primary btn-view-emi"
          onClick={() => openProductDetail(product)}
        >
          View EMI Plans <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
