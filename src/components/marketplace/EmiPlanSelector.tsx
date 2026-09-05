import React from 'react';
import { ShieldCheck, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import type { CalculatedEmi } from '../../types/marketplace';

interface EmiPlanSelectorProps {
  plans: CalculatedEmi[];
  selectedPlan: CalculatedEmi | null;
  onSelectPlan: (plan: CalculatedEmi) => void;
  productPrice: number;
}

export const EmiPlanSelector: React.FC<EmiPlanSelectorProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  productPrice
}) => {
  if (!selectedPlan) return null;

  return (
    <div>
      <div className="detail-options-group">
        <div className="detail-options-label">
          <span>Choose EMI Tenure Plan</span>
          <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>
            <ShieldCheck size={13} style={{ display: 'inline', marginRight: '3px' }} />
            Zero Downpayment Required
          </span>
        </div>

        {/* Tenure Cards Grid */}
        <div className="emi-plans-grid">
          {plans.map(plan => {
            const isSelected = selectedPlan.tenureMonths === plan.tenureMonths;
            return (
              <div
                key={plan.tenureMonths}
                className={`emi-plan-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectPlan(plan)}
              >
                {plan.isPopular && (
                  <div className="emi-plan-badge-popular">
                    <Sparkles size={9} style={{ display: 'inline' }} /> Recommended
                  </div>
                )}
                <div className="emi-plan-tenure">{plan.tenureMonths} Months</div>
                <div className="emi-plan-monthly">
                  ₹{plan.monthlyAmount.toLocaleString('en-IN')}
                </div>
                <div className="emi-plan-rate">
                  {plan.isNoCostEmi ? '0% No-Cost EMI' : `${plan.interestRate}% p.a.`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Plan Comprehensive Breakdown */}
      <div className="emi-breakdown-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Plan Breakdown ({selectedPlan.tenureMonths} Months)
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Lender Partner: <strong>{selectedPlan.lenderPartner}</strong>
          </span>
        </div>

        <div className="breakdown-row">
          <span>Device Net Price</span>
          <span>₹{productPrice.toLocaleString('en-IN')}</span>
        </div>

        <div className="breakdown-row">
          <span>Monthly Installment</span>
          <span style={{ color: 'var(--primary-purple)', fontWeight: 700 }}>
            ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')} / month
          </span>
        </div>

        <div className="breakdown-row">
          <span>Total Interest (No-Cost Subsidy)</span>
          <span style={{ color: selectedPlan.isNoCostEmi ? '#047857' : 'inherit', fontWeight: 600 }}>
            {selectedPlan.isNoCostEmi ? '₹0 (100% Waived)' : `₹${selectedPlan.totalInterest.toLocaleString('en-IN')}`}
          </span>
        </div>

        <div className="breakdown-row">
          <span>Processing Fee & Foreclosure</span>
          <span style={{ color: '#047857', fontWeight: 600 }}>
            {selectedPlan.processingFee === 0 ? '₹0 (Free)' : `₹${selectedPlan.processingFee}`}
          </span>
        </div>

        <div className="breakdown-row">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Required Mutual Fund Lien (1.25x)
            <span title="Your funds remain invested and earn returns. Only a lien is placed via CAMS/KFintech.">
              <HelpCircle size={13} color="var(--text-subtle)" />
            </span>
          </span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            ₹{selectedPlan.mfCollateralRequired.toLocaleString('en-IN')}
          </span>
        </div>

        {selectedPlan.interestSavedVsCreditCard > 0 && (
          <div className="breakdown-row" style={{ color: '#047857' }}>
            <span>Savings vs 16% Credit Card EMI</span>
            <span style={{ fontWeight: 700 }}>
              Save ₹{selectedPlan.interestSavedVsCreditCard.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        <div className="breakdown-row">
          <span>Total Repayment Amount</span>
          <span style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
            ₹{selectedPlan.totalPayable.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Mutual Fund Compounding Callout (1Fi Signature Advantage) */}
      <div className="mf-growth-callout">
        <div className="mf-growth-icon">
          <TrendingUp size={18} />
        </div>
        <div>
          <div className="mf-growth-title">
            Keep Compounding with 1Fi (Don't Sell Your Funds!)
          </div>
          <p className="mf-growth-desc">
            If you sold your mutual funds to buy this gadget, you would lose out on growth. 
            By choosing 1Fi's {selectedPlan.tenureMonths}-month EMI, your pledged funds of 
            {' '}<strong>₹{selectedPlan.mfCollateralRequired.toLocaleString('en-IN')}</strong> can generate an estimated{' '}
            <strong style={{ color: '#047857' }}>
              +₹{selectedPlan.projectedMfGains.toLocaleString('en-IN')}
            </strong> in compounding wealth at 14% historical CAGR!
          </p>
        </div>
      </div>
    </div>
  );
};
