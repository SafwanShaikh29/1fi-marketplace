import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/layout/Navbar';
import { ShopTabBar } from './components/layout/ShopTabBar';
import { Footer } from './components/layout/Footer';
import { TopBrandsView } from './components/shop/TopBrandsView';
import { NearbyStoresView } from './components/shop/NearbyStoresView';
import { MarketplaceView } from './components/shop/MarketplaceView';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import './styles/main.css';

const ShopContent: React.FC = () => {
  const { activeTab, toast } = useMarketplace();

  return (
    <div className="app-wrapper">
      {/* 1Fi Fixed Navbar */}
      <Navbar />

      {/* Shop Tab Switcher: Top Brands | Nearby Stores | 1Fi Marketplace */}
      <ShopTabBar />

      {/* Dynamic Main View */}
      <main style={{ flex: 1, paddingBottom: '4rem' }}>
        {activeTab === 'top_brands' && <TopBrandsView />}
        {activeTab === 'nearby_stores' && <NearbyStoresView />}
        {activeTab === 'marketplace' && <MarketplaceView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast-message">
            {toast.type === 'success' && <CheckCircle2 size={18} color="#10B981" />}
            {toast.type === 'error' && <AlertCircle size={18} color="#EF4444" />}
            {toast.type === 'info' && <Info size={18} color="#6C28D9" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <MarketplaceProvider>
      <ShopContent />
    </MarketplaceProvider>
  );
}

export default App;
