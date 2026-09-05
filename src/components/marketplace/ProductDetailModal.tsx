import React from 'react';
import { X, Star, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { EmiPlanSelector } from './EmiPlanSelector';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    selectedColor,
    setSelectedColor,
    selectedSpec,
    setSelectedSpec,
    selectedEmiPlan,
    setSelectedEmiPlan,
    calculatedPlans,
    currentPrice,
    openCheckout
  } = useMarketplace();

  if (!selectedProduct) return null;

  const activeImage = selectedColor?.image || selectedProduct.colors[0]?.image;

  return (
    <div className="modal-overlay" onClick={closeProductDetail}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={closeProductDetail}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="detail-modal-grid">
          {/* Left Column: Gallery & Highlights */}
          <div className="detail-gallery-col">
            <div className="detail-gallery-main">
              <img src={activeImage} alt={selectedProduct.name} />
            </div>

            {selectedColor && (
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Selected Finish: <strong style={{ color: 'var(--text-main)' }}>{selectedColor.name}</strong>
              </div>
            )}

            {/* Key Highlights */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                Key Specifications & Features
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedProduct.highlights.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <Check size={14} color="#047857" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory & Safety Assurance */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#ecfdf5', borderRadius: 'var(--radius-md)', border: '1px solid #a7f3d0' }}>
              <ShieldCheck size={20} color="#047857" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.75rem', color: '#065f46', lineHeight: 1.4 }}>
                <strong>RBI-Regulated NBFC Partners</strong>. Mutual funds remain safely in your demat/folio. Digital lien registered directly with CAMS / KFintech.
              </div>
            </div>
          </div>

          {/* Right Column: Variant Configurations & EMI Selector */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <span className="product-brand-name">{selectedProduct.brand}</span>
              <div className="product-rating-tag">
                <Star size={12} fill="#F59E0B" color="#F59E0B" />
                <span>{selectedProduct.rating}</span>
                <span style={{ color: 'var(--text-subtle)', fontSize: '0.7rem' }}>
                  ({selectedProduct.reviewCount} reviews)
                </span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem', lineHeight: 1.25 }}>
              {selectedProduct.name}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {selectedProduct.tagline}
            </p>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', padding: '0.75rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>
                ₹{(selectedProduct.mrp + (selectedSpec?.priceDelta || 0)).toLocaleString('en-IN')}
              </span>
              <span className="price-discount-tag" style={{ fontSize: '0.8125rem' }}>
                Save ₹{((selectedProduct.mrp + (selectedSpec?.priceDelta || 0)) - currentPrice).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Variant 1: Colors */}
            <div className="detail-options-group">
              <div className="detail-options-label">
                <span>Color Finish</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--primary-purple)', fontWeight: 600 }}>
                  {selectedColor?.name}
                </span>
              </div>
              <div className="detail-color-pills">
                {selectedProduct.colors.map(color => (
                  <button
                    key={color.name}
                    className={`color-option-btn ${selectedColor?.name === color.name ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: '1px solid rgba(0,0,0,0.15)'
                      }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant 2: Specs / Memory */}
            <div className="detail-options-group">
              <div className="detail-options-label">
                <span>Storage & Memory Specification</span>
              </div>
              <div className="detail-spec-pills">
                {selectedProduct.specs.map(spec => (
                  <button
                    key={spec.id}
                    className={`spec-option-btn ${selectedSpec?.id === spec.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSpec(spec)}
                  >
                    <div className="spec-option-label">{spec.label}</div>
                    <div className="spec-option-delta">
                      {spec.priceDelta === 0 ? 'Base Variant' : `+₹${spec.priceDelta.toLocaleString('en-IN')}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive EMI Plans Selector */}
            <EmiPlanSelector
              plans={calculatedPlans}
              selectedPlan={selectedEmiPlan}
              onSelectPlan={setSelectedEmiPlan}
              productPrice={currentPrice}
            />

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                className="btn-1fi-primary"
                style={{ flex: 1, padding: '0.9rem 1.5rem', fontSize: '1rem' }}
                onClick={() => {
                  openCheckout();
                }}
              >
                Proceed with {selectedEmiPlan?.tenureMonths}-Month Plan (₹{selectedEmiPlan?.monthlyAmount.toLocaleString('en-IN')}/mo)
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
