import React from 'react';
import { Search, SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'Tablets', 'Wearables'];

export const FilterToolbar: React.FC = () => {
  const { filters, updateFilter, simulateError, setSimulateError, showToast } = useMarketplace();

  return (
    <div className="filter-toolbar-wrap">
      {/* Search & Sort Row */}
      <div className="filter-search-row">
        {/* Search Box */}
        <div className="search-input-box">
          <Search size={18} />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search flagship phones, MacBooks, audio..."
            value={filters.searchQuery}
            onChange={e => updateFilter({ searchQuery: e.target.value })}
          />
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={16} color="var(--text-secondary)" />
          <select
            className="sort-select-box"
            value={filters.sortBy}
            onChange={e => updateFilter({ sortBy: e.target.value as any })}
          >
            <option value="popular">Most Popular & Best Sellers</option>
            <option value="emi_low">Lowest Monthly EMI</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        {/* 0% No Cost EMI filter */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            background: 'var(--bg-secondary)',
            padding: '0.7rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)',
            userSelect: 'none'
          }}
        >
          <input
            type="checkbox"
            checked={filters.onlyNoCostEmi}
            onChange={e => updateFilter({ onlyNoCostEmi: e.target.checked })}
          />
          <span>0% No-Cost EMI Only</span>
        </label>

        {/* Error Simulation Toggle (For evaluation purposes) */}
        <label className="error-sim-toggle" title="Test error resilience and retry UX">
          <AlertTriangle size={13} color={simulateError ? '#B91C1C' : '#6B7280'} />
          <span style={{ color: simulateError ? '#B91C1C' : 'inherit', fontWeight: simulateError ? 700 : 500 }}>
            Simulate API Error
          </span>
          <input
            type="checkbox"
            checked={simulateError}
            onChange={e => {
              setSimulateError(e.target.checked);
              showToast(
                e.target.checked
                  ? 'Simulated network error enabled. Test the retry UI!'
                  : 'Simulated network error disabled.',
                e.target.checked ? 'error' : 'info'
              );
            }}
          />
        </label>
      </div>

      {/* Category Chips Row */}
      <div className="category-chips-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-chip-btn ${filters.category === cat ? 'active' : ''}`}
            onClick={() => updateFilter({ category: cat })}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
