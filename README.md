# 🛍️ 1Fi Marketplace — Shop Page Feature

> **India's First LAMF-Based (Loan Against Mutual Funds) Shopping Platform**  
> *Buy what you love without selling your investments. Keep your wealth compounding at ~14% CAGR while shopping on 0% No-Cost EMIs.*

Built with **React, Vite, TypeScript, and 1Fi Vanilla CSS Design System** conforming to the design aesthetics of [1fi.in](https://1fi.in/).

---

## 🌟 Features Overview

### 1. Shop Page Navigation (Three Distinct Options)
- **Top Brands**: Clean, unpopulated placeholder section adhering to specifications (*"No implementation required; the page can remain blank"*), with a quick button to explore 1Fi Marketplace.
- **Nearby Stores**: Clean, unpopulated placeholder section adhering to specifications (*"No implementation required; the page can remain blank"*), with a quick button to explore 1Fi Marketplace.
- **1Fi Marketplace**: Fully implemented, dynamic, responsive product catalog and loan-against-mutual-funds (LAMF) EMI studio.

### 2. 1Fi Marketplace Core Capabilities
- **Curated Flagship Catalog**: Realistic flagship devices (Google Pixel 10 Pro, iPhone 17 Pro Max, Samsung Galaxy S25 Ultra, MacBook Pro 16" M4 Max, OnePlus 15 5G, Sony WH-1000XM5, Apple Watch Ultra 2, iPad Pro M4).
- **Interactive Variant Customization**:
  - **Color Swatches**: Switching finishes dynamically updates device imagery and details.
  - **Storage & Memory Specs**: Switching specifications dynamically updates pricing and recalculates all EMI plans in real time.
- **Dynamic EMI Engine & Financial Modeling**:
  - Flexible tenure selection (3, 6, 9, 12, 18, 24 months) with 0% No-Cost EMI subsidies.
  - **1.25x Mutual Fund Lien Requirement**: Conforms to RBI equity LAMF lending guidelines.
  - **Credit Card Interest Savings**: Calculates savings compared to standard 16% p.a. credit card EMIs.
  - **"Keep Compounding with 1Fi" Visualizer**: Compares the loss of selling mutual funds outright vs. continuing to earn ~14% CAGR while paying in easy installments.
- **Multi-Step Digital Pledge & Checkout Flow**:
  1. **Portfolio Allocation**: Select from verified user mutual fund holdings (Parag Parikh Flexi Cap, Mirae Asset, Nippon India).
  2. **Digital Authorization**: 4-digit OTP simulation for instant 10-second CAMS / KFintech pledge authorization.
  3. **Order Confirmation**: Displays Order ID, Loan ID, Digital Lien Reference, delivery schedule, and first auto-debit date with celebration confetti.
- **Attention to Detail & UX Resilience**:
  - Shimmering loading skeletons for smooth transitions.
  - Built-in **Simulate API Error** toggle to test error recovery and instant retry UX.
  - Search by keyword/tagline/specs and instant category chips filter.
  - Sticky glassmorphic navigation featuring live **Eligible Credit Limit (`₹2,70,000`)** pill widget.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) with [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict type safety) |
| **Styling** | Vanilla CSS Design System with CSS Tokens & Variables (Matching 1Fi Brand Identity) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Delight / FX** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** >= 18.0.0 (Node 20+ recommended)
- **npm** >= 9.0.0

### Installation & Run

1. **Clone or navigate into the project directory**:
   ```bash
   cd "Marketplace Project"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Create a production build**:
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture & Directory Structure

```text
Marketplace Project/
├── index.html                    # 1Fi branding, Inter fonts, and metadata
├── package.json                  # Dependencies and build scripts
├── requirements.txt              # Environment and package specifications
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite bundler configuration
├── src/
│   ├── main.tsx                  # Application entrypoint
│   ├── App.tsx                   # Main Shop layout & view switcher
│   ├── types/
│   │   └── marketplace.ts        # TypeScript schemas for products, EMIs, portfolio
│   ├── data/
│   │   └── mockProducts.ts       # Flagship product catalog & user MF portfolio
│   ├── services/
│   │   └── api.ts                # Dynamic API service (EMI formulas & pledge logic)
│   ├── context/
│   │   └── MarketplaceContext.tsx# Centralized global state & filter management
│   ├── styles/
│   │   ├── variables.css         # 1Fi design tokens (#6C28D9, gradients, radii)
│   │   └── main.css              # Global styles, 3D tactile buttons, layout
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx        # Brand header with portfolio credit widget
│       │   ├── ShopTabBar.tsx    # Tab switcher: Top Brands | Nearby Stores | 1Fi Marketplace
│       │   └── Footer.tsx        # Partner ecosystem (Tata Capital, CAMS, KFintech)
│       ├── shop/
│       │   ├── TopBrandsView.tsx # Top Brands placeholder view
│       │   ├── NearbyStoresView.tsx # Nearby Stores placeholder view
│       │   └── MarketplaceView.tsx  # 1Fi Marketplace view
│       └── marketplace/
│           ├── MarketplaceBanner.tsx # 1Fi LAMF Hero value proposition banner
│           ├── FilterToolbar.tsx     # Search, category chips, sort, error simulator
│           ├── ProductGrid.tsx       # Grid with skeleton loaders & error retry state
│           ├── ProductCard.tsx       # Product card with badges, price, lowest EMI
│           ├── ProductDetailModal.tsx# Variant configuration & spec highlights
│           ├── EmiPlanSelector.tsx   # Interactive tenure cards & compounding visualizer
│           └── CheckoutModal.tsx     # Multi-step pledge authorization & celebration
# 7. Push to GitHub
git push -u origin main
```
