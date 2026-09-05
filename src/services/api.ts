import type {
  Product,
  CalculatedEmi,
  EmiPlan,
  MarketplaceFilterState,
  PledgeOrderPayload,
  OrderConfirmationResult
} from '../types/marketplace';
import { MOCK_PRODUCTS } from '../data/mockProducts';

// Simulated network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MarketplaceApiService {
  private products: Product[] = [...MOCK_PRODUCTS];

  /**
   * Fetch products dynamically with filter, sort, search, and simulated network states
   */
  async getProducts(
    filters: MarketplaceFilterState,
    options?: { simulateError?: boolean; customDelay?: number }
  ): Promise<Product[]> {
    await delay(options?.customDelay ?? 400);

    if (options?.simulateError) {
      throw new Error('Unable to sync with 1Fi Marketplace catalog. Please check your connection and retry.');
    }

    let result = [...this.products];

    // Filter by Category
    if (filters.category && filters.category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Filter by Brand
    if (filters.brand && filters.brand !== 'All') {
      result = result.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    // Filter by Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.highlights.some(h => h.toLowerCase().includes(q))
      );
    }

    // Filter by No-Cost EMI
    if (filters.onlyNoCostEmi) {
      result = result.filter(p => p.emiOptions.some(opt => opt.isNoCostEmi));
    }

    // Sort order
    switch (filters.sortBy) {
      case 'price_low':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price_high':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'emi_low': {
        const getLowestEmi = (p: Product) =>
          Math.min(...p.emiOptions.map(opt => this.calculatePlanEmi(p.basePrice, opt).monthlyAmount));
        result.sort((a, b) => getLowestEmi(a) - getLowestEmi(b));
        break;
      }
      case 'popular':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
        break;
    }

    return result;
  }

  /**
   * Fetch single product detail by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    await delay(250);
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  /**
   * Dynamic EMI calculation engine for a specific product price & tenure plan
   */
  calculatePlanEmi(principal: number, plan: EmiPlan): CalculatedEmi {
    const tenure = plan.tenureMonths;
    let monthlyAmount: number;
    let totalPayable: number;
    let totalInterest: number;

    if (plan.interestRate === 0 || plan.isNoCostEmi) {
      monthlyAmount = Math.round(principal / tenure);
      totalPayable = monthlyAmount * tenure;
      totalInterest = 0;
    } else {
      // Standard Reducing Balance EMI formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
      const monthlyRate = plan.interestRate / 12 / 100;
      const factor = Math.pow(1 + monthlyRate, tenure);
      monthlyAmount = Math.round((principal * monthlyRate * factor) / (factor - 1));
      totalPayable = monthlyAmount * tenure;
      totalInterest = totalPayable - principal;
    }

    // Calculate interest saved vs Standard Credit Card (16% p.a.)
    const ccMonthlyRate = 0.16 / 12;
    const ccFactor = Math.pow(1 + ccMonthlyRate, tenure);
    const ccMonthlyAmount = Math.round((principal * ccMonthlyRate * ccFactor) / (ccFactor - 1));
    const ccTotalInterest = ccMonthlyAmount * tenure - principal;
    const interestSavedVsCreditCard = Math.max(0, ccTotalInterest - totalInterest);

    // Mutual fund lien collateral required: 1.25x of principal (under RBI LAMF equity guidelines)
    const mfCollateralRequired = Math.round(principal * 1.25);

    // Projected returns if funds remain invested at 14% CAGR (1Fi core advantage)
    const years = tenure / 12;
    const projectedFutureValue = mfCollateralRequired * Math.pow(1 + 0.14, years);
    const projectedMfGains = Math.round(projectedFutureValue - mfCollateralRequired);

    return {
      tenureMonths: tenure,
      monthlyAmount,
      principalAmount: principal,
      totalPayable,
      totalInterest,
      interestRate: plan.interestRate,
      isNoCostEmi: plan.isNoCostEmi,
      isPopular: plan.isPopular,
      interestSavedVsCreditCard,
      mfCollateralRequired,
      projectedMfGains,
      lenderPartner: plan.lenderPartner,
      processingFee: plan.processingFee
    };
  }

  /**
   * Calculate all available EMI options for a given price
   */
  getAllEmiOptions(product: Product, priceAdjustment: number = 0): CalculatedEmi[] {
    const finalPrice = product.basePrice + priceAdjustment;
    return product.emiOptions.map(plan => this.calculatePlanEmi(finalPrice, plan));
  }

  /**
   * Simulates CAMS / KFintech mutual fund pledging and instant 1Fi loan order creation
   */
  async submitPledgeOrder(payload: PledgeOrderPayload): Promise<OrderConfirmationResult> {
    await delay(1200); // realistic pledge processing time

    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3);

    const firstDebitDate = new Date(today);
    firstDebitDate.setMonth(today.getMonth() + 1);
    firstDebitDate.setDate(5); // 5th of next month

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const unitsToPledge = Number((payload.selectedPlan.mfCollateralRequired / payload.selectedFund.nav).toFixed(2));

    return {
      orderId: `1FI-ORD-${randomSuffix}`,
      loanId: `1FI-LAMF-${randomSuffix + 42}`,
      pledgeReferenceNo: `CAMS-${Date.now().toString().slice(-8)}`,
      orderDate: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedDeliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      firstEmiDebitDate: firstDebitDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      lenderPartner: payload.selectedPlan.lenderPartner,
      monthlyEmi: payload.selectedPlan.monthlyAmount,
      tenureMonths: payload.selectedPlan.tenureMonths,
      totalAmount: payload.finalPrice,
      pledgedFundName: payload.selectedFund.fundName,
      pledgedUnits: unitsToPledge,
      lienAmount: payload.selectedPlan.mfCollateralRequired
    };
  }
}

export const marketplaceApi = new MarketplaceApiService();
