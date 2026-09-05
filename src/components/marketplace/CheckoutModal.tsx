import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../../context/MarketplaceContext';
import type { OrderConfirmationResult } from '../../types/marketplace';
import { marketplaceApi } from '../../services/api';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    closeProductDetail,
    selectedProduct,
    selectedColor,
    selectedSpec,
    selectedEmiPlan,
    currentPrice,
    userPortfolio,
    showToast
  } = useMarketplace();

  // Multi-step: 1 = Allocation, 2 = Verification OTP, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFundId, setSelectedFundId] = useState<string>(userPortfolio.holdings[0]?.id || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('7842');
  const [orderResult, setOrderResult] = useState<OrderConfirmationResult | null>(null);

  // Delivery Address form
  const [address] = useState({
    fullName: userPortfolio.userName,
    phone: '+91 98201 43210',
    street: 'B-402, Signature Heights, Linking Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  if (!isCheckoutOpen || !selectedProduct || !selectedColor || !selectedSpec || !selectedEmiPlan) {
    return null;
  }

  const selectedFund = userPortfolio.holdings.find(h => h.id === selectedFundId) || userPortfolio.holdings[0];

  const handleStartPledge = () => {
    setStep(2);
  };

  const handleConfirmPledge = async () => {
    setIsSubmitting(true);
    try {
      const result = await marketplaceApi.submitPledgeOrder({
        product: selectedProduct,
        selectedColor,
        selectedSpec,
        selectedPlan: selectedEmiPlan,
        finalPrice: currentPrice,
        selectedFund,
        deliveryAddress: address
      });

      setOrderResult(result);
      setStep(3);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if not supported
      }

      showToast('Congratulations! Order placed and mutual fund lien established successfully.', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Pledge verification failed';
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    closeCheckout();
    closeProductDetail();
  };

  return (
    <div className="modal-overlay" onClick={handleFinish}>
      <div
        className="modal-dialog"
        style={{ maxWidth: '640px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleFinish} aria-label="Close dialog">
          <X size={20} />
        </button>

        {/* Stepper Header */}
        <div className="checkout-stepper">
          <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <span className="checkout-step-number">{step > 1 ? '✓' : '1'}</span>
            <span>Fund Lien Allocation</span>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-medium)' }} />
          <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
            <span className="checkout-step-number">{step > 2 ? '✓' : '2'}</span>
            <span>Digital Authorization</span>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-medium)' }} />
          <div className={`checkout-step ${step === 3 ? 'active done' : ''}`}>
            <span className="checkout-step-number">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: Fund Allocation & Delivery Details */}
        {step === 1 && (
          <div style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Select Mutual Fund to Pledge
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Your units will remain invested in your name and continue compounding. 
              Only a digital lien of <strong>₹{selectedEmiPlan.mfCollateralRequired.toLocaleString('en-IN')}</strong> will be marked via {selectedFund.rta}.
            </p>

            {/* Fund list */}
            <div style={{ marginBottom: '1.5rem' }}>
              {userPortfolio.holdings.map(fund => {
                const isSelected = selectedFundId === fund.id;
                const canCover = fund.totalValue >= selectedEmiPlan.mfCollateralRequired;
                return (
                  <div
                    key={fund.id}
                    className={`fund-pledge-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => canCover && setSelectedFundId(fund.id)}
                    style={{ opacity: canCover ? 1 : 0.6, cursor: canCover ? 'pointer' : 'not-allowed' }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {fund.fundName}
                        </span>
                        <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#047857', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                          {fund.rta} Verified
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Folio: {fund.folioNo} • Holding Value: <strong>₹{fund.totalValue.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>
                        +{fund.cagr3Yr}% 3Y CAGR
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                        {canCover ? 'Eligible' : 'Insufficient Holding'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Details */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <MapPin size={15} color="var(--primary-purple)" />
                <span>Delivery Address (Fast Free Delivery)</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong>{address.fullName}</strong> ({address.phone})<br />
                {address.street}, {address.city}, {address.state} - {address.pincode}
              </div>
            </div>

            {/* Price & Monthly summary */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-purple)', fontWeight: 600 }}>Monthly Installment</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ₹{selectedEmiPlan.monthlyAmount.toLocaleString('en-IN')} / mo
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tenure & Interest</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#047857' }}>
                  {selectedEmiPlan.tenureMonths} Months • 0% Interest
                </div>
              </div>
            </div>

            <button className="btn-1fi-primary" style={{ width: '100%', padding: '0.85rem' }} onClick={handleStartPledge}>
              Proceed to Digital Authorization <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Instant OTP / Authorization */}
        {step === 2 && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Lock size={26} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Authorize Lien with {selectedFund.rta}
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
              Enter the 4-digit OTP sent to registered mobile <strong>{userPortfolio.phoneMasked}</strong> to create the 
              pledge of ₹{selectedEmiPlan.mfCollateralRequired.toLocaleString('en-IN')} on your {selectedFund.amc} folio.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                style={{
                  fontSize: '1.75rem',
                  letterSpacing: '0.5rem',
                  textAlign: 'center',
                  padding: '0.6rem 1rem',
                  width: '180px',
                  borderRadius: '12px',
                  border: '2px solid var(--primary-purple)',
                  outline: 'none',
                  fontWeight: 800,
                  color: 'var(--primary-purple)'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#047857', marginBottom: '1.75rem' }}>
              <ShieldCheck size={14} />
              <span>256-bit Bank Grade Encrypted Pledge via {selectedFund.rta} Gateway</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn-1fi-secondary"
                style={{ flex: 1 }}
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                className="btn-1fi-primary"
                style={{ flex: 2 }}
                onClick={handleConfirmPledge}
                disabled={isSubmitting || otpCode.length !== 4}
              >
                {isSubmitting ? 'Verifying with Registrar...' : 'Verify & Confirm Order'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Placed & Lien Created */}
        {step === 3 && orderResult && (
          <div className="order-success-wrap">
            <div className="success-check-bubble">
              <CheckCircle2 size={42} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
              Order Confirmed & Lien Placed!
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Your device is being packed for delivery. Your mutual funds remain invested and continue growing!
            </p>

            {/* Order & Loan Details Matrix */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>Order ID</span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{orderResult.orderId}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>Loan ID</span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--primary-purple)' }}>{orderResult.loanId}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>Digital Lien Reference</span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{orderResult.pledgeReferenceNo}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>Financing Partner</span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{orderResult.lenderPartner}</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Product:</span>
                  <strong>{selectedProduct.name} ({selectedColor.name}, {selectedSpec.label})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Delivery:</span>
                  <strong style={{ color: '#047857' }}>{orderResult.estimatedDeliveryDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>First Auto-Debit Date:</span>
                  <strong>{orderResult.firstEmiDebitDate} (₹{orderResult.monthlyEmi.toLocaleString('en-IN')})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Mutual Fund Lien Amount:</span>
                  <strong>₹{orderResult.lienAmount.toLocaleString('en-IN')} ({orderResult.pledgedUnits} units of {selectedFund.amc})</strong>
                </div>
              </div>
            </div>

            <button className="btn-1fi-primary" style={{ width: '100%', padding: '0.85rem' }} onClick={handleFinish}>
              Continue Shopping on 1Fi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
