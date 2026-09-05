export interface ProductVariantColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductVariantSpec {
  id: string;
  label: string;
  storage?: string;
  ram?: string;
  priceDelta: number; // e.g. +10000 for 256GB vs 128GB
  inStock: boolean;
}

export interface EmiPlan {
  tenureMonths: number;
  interestRate: number; // 0 for No-Cost EMI
  isNoCostEmi: boolean;
  isPopular?: boolean;
  processingFee: number;
  lenderPartner: 'Tata Capital' | 'DSP Finance' | 'Bajaj Finserv' | '1Fi Credit';
}

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Google' | 'Samsung' | 'Sony' | 'OnePlus';
  category: 'Smartphones' | 'Laptops' | 'Audio' | 'Tablets' | 'Wearables';
  tagline: string;
  description: string;
  basePrice: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  badge?: string;
  colors: ProductVariantColor[];
  specs: ProductVariantSpec[];
  highlights: string[];
  emiOptions: EmiPlan[];
}

export interface CalculatedEmi {
  tenureMonths: number;
  monthlyAmount: number;
  principalAmount: number;
  totalPayable: number;
  totalInterest: number;
  interestRate: number;
  isNoCostEmi: boolean;
  isPopular?: boolean;
  interestSavedVsCreditCard: number;
  mfCollateralRequired: number; // 1.25x collateral pledge required
  projectedMfGains: number; // Expected returns at 12% CAGR by keeping funds invested
  lenderPartner: string;
  processingFee: number;
}

export interface MutualFundHolding {
  id: string;
  fundName: string;
  amc: string;
  category: 'Flexi Cap' | 'Large Cap' | 'Mid Cap' | 'Index Fund';
  folioNo: string;
  units: number;
  nav: number;
  totalValue: number;
  cagr3Yr: number;
  rta: 'CAMS' | 'KFintech';
  pledgeEligible: boolean;
}

export interface UserPortfolio {
  totalPortfolioValue: number;
  eligibleCreditLimit: number;
  utilizedCredit: number;
  availableCredit: number;
  holdings: MutualFundHolding[];
  userName: string;
  panMasked: string;
  phoneMasked: string;
}

export type ShopTab = 'top_brands' | 'nearby_stores' | 'marketplace';

export interface MarketplaceFilterState {
  category: string;
  brand: string;
  searchQuery: string;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'emi_low';
  onlyNoCostEmi: boolean;
}

export interface PledgeOrderPayload {
  product: Product;
  selectedColor: ProductVariantColor;
  selectedSpec: ProductVariantSpec;
  selectedPlan: CalculatedEmi;
  finalPrice: number;
  selectedFund: MutualFundHolding;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface OrderConfirmationResult {
  orderId: string;
  loanId: string;
  pledgeReferenceNo: string;
  orderDate: string;
  estimatedDeliveryDate: string;
  firstEmiDebitDate: string;
  lenderPartner: string;
  monthlyEmi: number;
  tenureMonths: number;
  totalAmount: number;
  pledgedFundName: string;
  pledgedUnits: number;
  lienAmount: number;
}
