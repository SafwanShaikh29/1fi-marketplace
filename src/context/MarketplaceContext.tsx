import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type {
  Product,
  ProductVariantColor,
  ProductVariantSpec,
  CalculatedEmi,
  MarketplaceFilterState,
  ShopTab,
  UserPortfolio,
  OrderConfirmationResult
} from '../types/marketplace';
import { INITIAL_USER_PORTFOLIO } from '../data/mockProducts';
import { marketplaceApi } from '../services/api';

interface MarketplaceContextType {
  activeTab: ShopTab;
  setActiveTab: (tab: ShopTab) => void;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  retryFetch: () => void;
  filters: MarketplaceFilterState;
  updateFilter: (patch: Partial<MarketplaceFilterState>) => void;
  resetFilters: () => void;
  simulateError: boolean;
  setSimulateError: (val: boolean) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  selectedColor: ProductVariantColor | null;
  setSelectedColor: (color: ProductVariantColor) => void;
  selectedSpec: ProductVariantSpec | null;
  setSelectedSpec: (spec: ProductVariantSpec) => void;
  selectedEmiPlan: CalculatedEmi | null;
  setSelectedEmiPlan: (plan: CalculatedEmi) => void;
  calculatedPlans: CalculatedEmi[];
  currentPrice: number;
  userPortfolio: UserPortfolio;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  orderResult: OrderConfirmationResult | null;
  setOrderResult: (res: OrderConfirmationResult | null) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const DEFAULT_FILTERS: MarketplaceFilterState = {
  category: 'All',
  brand: 'All',
  searchQuery: '',
  sortBy: 'popular',
  onlyNoCostEmi: false
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation: Shop Tab
  const [activeTab, setActiveTab] = useState<ShopTab>('marketplace');

  // Products & API state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<boolean>(false);
  const [filters, setFilters] = useState<MarketplaceFilterState>(DEFAULT_FILTERS);

  // Portfolio state
  const [userPortfolio] = useState<UserPortfolio>(INITIAL_USER_PORTFOLIO);

  // Active Product Detail Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<ProductVariantSpec | null>(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<CalculatedEmi | null>(null);

  // Checkout flow state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderResult, setOrderResult] = useState<OrderConfirmationResult | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  // Fetch products with filters
  const fetchCatalog = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await marketplaceApi.getProducts(filters, { simulateError });
      setProducts(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load catalog';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters, simulateError]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const retryFetch = useCallback(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const updateFilter = useCallback((patch: Partial<MarketplaceFilterState>) => {
    setFilters(prev => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Calculate current price based on selected product + active variant
  const currentPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    const delta = selectedSpec?.priceDelta ?? 0;
    return selectedProduct.basePrice + delta;
  }, [selectedProduct, selectedSpec]);

  // Recalculate EMI plans whenever product price or specs change
  const calculatedPlans = useMemo(() => {
    if (!selectedProduct) return [];
    const delta = selectedSpec?.priceDelta ?? 0;
    return marketplaceApi.getAllEmiOptions(selectedProduct, delta);
  }, [selectedProduct, selectedSpec]);

  // Keep selected plan synced or default to 12mo/popular
  useEffect(() => {
    if (calculatedPlans.length > 0) {
      // Try to preserve current tenure selection if possible
      const currentTenure = selectedEmiPlan?.tenureMonths;
      const matchingPlan = calculatedPlans.find(p => p.tenureMonths === currentTenure);
      if (matchingPlan) {
        setSelectedEmiPlan(matchingPlan);
      } else {
        const popularOrFirst = calculatedPlans.find(p => p.isPopular) || calculatedPlans[0];
        setSelectedEmiPlan(popularOrFirst);
      }
    }
  }, [calculatedPlans]);

  // Open modal and initialize variants
  const openProductDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0] || null);
    setSelectedSpec(product.specs[0] || null);
    const plans = marketplaceApi.getAllEmiOptions(product, 0);
    const popularOrFirst = plans.find(p => p.isPopular) || plans[0];
    setSelectedEmiPlan(popularOrFirst);
  }, []);

  const closeProductDetail = useCallback(() => {
    setSelectedProduct(null);
    setSelectedColor(null);
    setSelectedSpec(null);
    setSelectedEmiPlan(null);
  }, []);

  const openCheckout = useCallback(() => {
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products,
        isLoading,
        error,
        retryFetch,
        filters,
        updateFilter,
        resetFilters,
        simulateError,
        setSimulateError,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        selectedColor,
        setSelectedColor,
        selectedSpec,
        setSelectedSpec,
        selectedEmiPlan,
        setSelectedEmiPlan,
        calculatedPlans,
        currentPrice,
        userPortfolio,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        orderResult,
        setOrderResult,
        toast,
        showToast
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
