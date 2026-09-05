import type { Product, UserPortfolio } from '../types/marketplace';

export const INITIAL_USER_PORTFOLIO: UserPortfolio = {
  userName: 'Safwan Shaikh',
  panMasked: 'ABCDE****F',
  phoneMasked: '+91 98****3210',
  totalPortfolioValue: 540000,
  eligibleCreditLimit: 270000,
  utilizedCredit: 0,
  availableCredit: 270000,
  holdings: [
    {
      id: 'mf-1',
      fundName: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth',
      amc: 'PPFAS Mutual Fund',
      category: 'Flexi Cap',
      folioNo: '10892744/22',
      units: 2452.88,
      nav: 91.73,
      totalValue: 225000,
      cagr3Yr: 21.4,
      rta: 'CAMS',
      pledgeEligible: true
    },
    {
      id: 'mf-2',
      fundName: 'Mirae Asset Large & Midcap Fund - Direct Plan - Growth',
      amc: 'Mirae Asset Mutual Fund',
      category: 'Large Cap',
      folioNo: '78294401/15',
      units: 1422.41,
      nav: 116.0,
      totalValue: 165000,
      cagr3Yr: 18.2,
      rta: 'KFintech',
      pledgeEligible: true
    },
    {
      id: 'mf-3',
      fundName: 'Nippon India Small Cap Fund - Direct Plan - Growth',
      amc: 'Nippon Life India AMC',
      category: 'Mid Cap',
      folioNo: '99201944/08',
      units: 967.74,
      nav: 155.0,
      totalValue: 150000,
      cagr3Yr: 25.8,
      rta: 'CAMS',
      pledgeEligible: true
    }
  ]
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-iphone17-promax',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    tagline: 'Titanium precision. Next-gen A19 Pro Bionic with Apple Intelligence.',
    description: 'The ultimate iPhone engineered with grade-5 titanium, 48MP periscope telephoto camera, and 120Hz ProMotion XDR display. Backed 100% by your mutual fund portfolio with zero interest.',
    basePrice: 139900,
    mrp: 159900,
    rating: 4.9,
    reviewCount: 1420,
    isFeatured: true,
    isBestSeller: true,
    badge: '0% Interest • 12 Months',
    colors: [
      {
        name: 'Deep Titanium',
        hex: '#3E3D40',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Desert Gold',
        hex: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1695048065057-d0b353e99983?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Natural White',
        hex: '#F2F2F2',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'sp-1', label: '256 GB', storage: '256 GB', ram: '8 GB', priceDelta: 0, inStock: true },
      { id: 'sp-2', label: '512 GB', storage: '512 GB', ram: '8 GB', priceDelta: 20000, inStock: true },
      { id: 'sp-3', label: '1 TB', storage: '1 TB', ram: '8 GB', priceDelta: 40000, inStock: true }
    ],
    highlights: [
      'A19 Pro chip with hardware ray tracing',
      '48MP Fusion Camera with 5x Optical Zoom',
      'Up to 33 hours video playback',
      'Action Button & Camera Control capacitive key',
      'Pre-approved via CAMS & KFintech pledge'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 9, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Bajaj Finserv' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 18, interestRate: 6.99, isNoCostEmi: false, processingFee: 499, lenderPartner: '1Fi Credit' },
      { tenureMonths: 24, interestRate: 7.99, isNoCostEmi: false, processingFee: 499, lenderPartner: '1Fi Credit' }
    ]
  },
  {
    id: 'prod-pixel-10',
    name: 'Google Pixel 10 Pro',
    brand: 'Google',
    category: 'Smartphones',
    tagline: 'Google Tensor G5. Unmatched AI photography and 7 years of OS upgrades.',
    description: 'The AI powerhouse phone featuring Super Actua display, triple pro rear camera system with Gemini Nano integrated on-device. Zero foreclosure charges and zero downpayment.',
    basePrice: 109999,
    mrp: 124999,
    rating: 4.8,
    reviewCount: 880,
    isFeatured: true,
    isBestSeller: false,
    badge: '0% Interest • 12 Months',
    colors: [
      {
        name: 'Obsidian',
        hex: '#232528',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Porcelain',
        hex: '#EAE8E3',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Hazel',
        hex: '#5A6258',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'px-1', label: '128 GB / 16GB RAM', storage: '128 GB', ram: '16 GB', priceDelta: 0, inStock: true },
      { id: 'px-2', label: '256 GB / 16GB RAM', storage: '256 GB', ram: '16 GB', priceDelta: 10000, inStock: true },
      { id: 'px-3', label: '512 GB / 16GB RAM', storage: '512 GB', ram: '16 GB', priceDelta: 24000, inStock: true }
    ],
    highlights: [
      'Tensor G5 processor with next-gen TPU',
      'Pro triple camera with 30x Super Res Zoom',
      'Temperature Sensor & Satellite SOS',
      'Keep Mutual Funds compounding at ~14% while paying monthly'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 24, interestRate: 7.5, isNoCostEmi: false, processingFee: 399, lenderPartner: 'Bajaj Finserv' }
    ]
  },
  {
    id: 'prod-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    tagline: 'Built-in S Pen, Snapdragon 8 Elite, and 200MP Quad Telephoto Camera.',
    description: 'The pinnacle of Android productivity. Features Armor Aluminum frame, Corning Gorilla Armor anti-reflective glass, and seamless Galaxy AI workflow integration.',
    basePrice: 129999,
    mrp: 144999,
    rating: 4.9,
    reviewCount: 1105,
    isFeatured: true,
    isBestSeller: true,
    badge: '0% Interest • Instant Approval',
    colors: [
      {
        name: 'Titanium Gray',
        hex: '#5E6064',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Titanium Black',
        hex: '#1E1E20',
        image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Titanium Violet',
        hex: '#4A3B52',
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 's25-1', label: '256 GB / 12GB RAM', storage: '256 GB', ram: '12 GB', priceDelta: 0, inStock: true },
      { id: 's25-2', label: '512 GB / 12GB RAM', storage: '512 GB', ram: '12 GB', priceDelta: 15000, inStock: true },
      { id: 's25-3', label: '1 TB / 16GB RAM', storage: '1 TB', ram: '16 GB', priceDelta: 35000, inStock: true }
    ],
    highlights: [
      'Snapdragon 8 Elite for Galaxy (3nm)',
      '200MP Main + 50MP 5x Periscope + 50MP Ultra-Wide',
      'Dynamic AMOLED 2X with 2600 nits peak brightness',
      'Integrated S Pen with Air Actions'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 18, interestRate: 6.99, isNoCostEmi: false, processingFee: 499, lenderPartner: '1Fi Credit' },
      { tenureMonths: 24, interestRate: 7.99, isNoCostEmi: false, processingFee: 499, lenderPartner: '1Fi Credit' }
    ]
  },
  {
    id: 'prod-macbook-pro-m4',
    name: 'MacBook Pro 16" (M4 Max)',
    brand: 'Apple',
    category: 'Laptops',
    tagline: 'Phenomenal power. Liquid Retina XDR. Up to 24 hours of battery life.',
    description: 'Engineered for developers, designers, and power creators. The M4 Max chip blazes through 8K video renders, LLM local fine-tuning, and massive codebases without breaking a sweat.',
    basePrice: 249900,
    mrp: 279900,
    rating: 5.0,
    reviewCount: 630,
    isFeatured: true,
    isBestSeller: false,
    badge: '0% Interest • 12-24 Months',
    colors: [
      {
        name: 'Space Black',
        hex: '#2B2B2D',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Silver',
        hex: '#E3E4E5',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'mb-1', label: '36GB Unified Memory / 1TB SSD', storage: '1 TB', ram: '36 GB', priceDelta: 0, inStock: true },
      { id: 'mb-2', label: '48GB Unified Memory / 1TB SSD', storage: '1 TB', ram: '48 GB', priceDelta: 25000, inStock: true },
      { id: 'mb-3', label: '64GB Unified Memory / 2TB SSD', storage: '2 TB', ram: '64 GB', priceDelta: 60000, inStock: true }
    ],
    highlights: [
      '14-Core CPU, 32-Core GPU, 16-Core Neural Engine',
      'Liquid Retina XDR display with 1600 nits peak HDR',
      '3x Thunderbolt 5 ports, HDMI, SDXC, MagSafe 3',
      'Save over ₹38,000 in credit card interest using 1Fi Mutual Fund EMI'
    ],
    emiOptions: [
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 18, interestRate: 5.99, isNoCostEmi: false, processingFee: 999, lenderPartner: 'Tata Capital' },
      { tenureMonths: 24, interestRate: 6.99, isNoCostEmi: false, processingFee: 999, lenderPartner: '1Fi Credit' },
      { tenureMonths: 36, interestRate: 7.99, isNoCostEmi: false, processingFee: 1499, lenderPartner: '1Fi Credit' }
    ]
  },
  {
    id: 'prod-oneplus-15',
    name: 'OnePlus 15 5G',
    brand: 'OnePlus',
    category: 'Smartphones',
    tagline: 'Extreme performance with 4th Gen Hasselblad Camera & 120W SUPERVOOC.',
    description: 'Flagship speed meets sophisticated design. Equipped with dual cryogenic cooling, 2K 120Hz ProXDR display, and lightning-quick battery recharging.',
    basePrice: 69999,
    mrp: 79999,
    rating: 4.7,
    reviewCount: 920,
    isFeatured: false,
    isBestSeller: true,
    badge: '0% Interest • Instant Approval',
    colors: [
      {
        name: 'Emerald Flow',
        hex: '#1E3F35',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Silky Black',
        hex: '#1F2022',
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'op-1', label: '256 GB / 12GB RAM', storage: '256 GB', ram: '12 GB', priceDelta: 0, inStock: true },
      { id: 'op-2', label: '512 GB / 16GB RAM', storage: '512 GB', ram: '16 GB', priceDelta: 8000, inStock: true }
    ],
    highlights: [
      'Snapdragon 8 Gen Elite + Trinity Engine',
      'Hasselblad Camera for Mobile with Sony LYT-808 sensor',
      '5400 mAh Glacier battery with 100W wired & 50W wireless flash charge'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' }
    ]
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 ANC Headphones',
    brand: 'Sony',
    category: 'Audio',
    tagline: 'Industry-leading noise cancellation with two processors and eight microphones.',
    description: 'Immerse yourself in pure studio acoustics. Auto NC Optimizer automatically optimizes sound based on wearing conditions and environment. Lightweight, soft-fit leather design.',
    basePrice: 29990,
    mrp: 34990,
    rating: 4.9,
    reviewCount: 2450,
    isFeatured: false,
    isBestSeller: true,
    badge: '0% Interest • 6 Months',
    colors: [
      {
        name: 'Silver Mist',
        hex: '#D9D9D6',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Midnight Black',
        hex: '#1A1A1A',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Smoky Navy',
        hex: '#1D2A3A',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'sn-1', label: 'Standard Over-Ear Edition', priceDelta: 0, inStock: true }
    ],
    highlights: [
      'HD Noise Cancelling Processor QN1 & Integrated Processor V1',
      '30-hour battery life with fast 3-minute charging for 3 hours playback',
      'Speak-to-Chat & Multipoint connection (pair 2 devices)',
      'High-Resolution Audio Wireless with LDAC'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 9, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: '1Fi Credit' }
    ]
  },
  {
    id: 'prod-apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 (GPS + Cellular)',
    brand: 'Apple',
    category: 'Wearables',
    tagline: 'Rugged titanium case. Precision dual-frequency GPS. Up to 72 hours in Low Power Mode.',
    description: 'The most capable and rugged Apple Watch ever. Powered by S9 SiP with double tap gesture, brightest 3000-nit display, and depth gauge for water sports.',
    basePrice: 89900,
    mrp: 99900,
    rating: 4.8,
    reviewCount: 710,
    isFeatured: false,
    isBestSeller: false,
    badge: '0% Interest • 12 Months',
    colors: [
      {
        name: 'Natural Titanium w/ Ocean Band',
        hex: '#989793',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Black Titanium w/ Trail Loop',
        hex: '#2B2B2B',
        image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'wu-1', label: '49mm Titanium Case', priceDelta: 0, inStock: true }
    ],
    highlights: [
      '49mm aerospace-grade titanium case with sapphire front crystal',
      'Customizable Action button',
      'Precision Dual-Frequency GPS (L1 & L5)',
      'Water resistant to 100m, certified EN13319 for recreational diving'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'Tata Capital' }
    ]
  },
  {
    id: 'prod-ipad-pro-m4',
    name: 'iPad Pro 13" (M4 OLED Display)',
    brand: 'Apple',
    category: 'Tablets',
    tagline: 'Impossibly thin. Breakthrough Ultra Retina XDR with Tandem OLED technology.',
    description: 'The thinnest product Apple has ever made. Revolutionary tandem OLED display delivers unbelievable brightness and contrast, driven by the outrageous speed of the M4 chip.',
    basePrice: 129900,
    mrp: 139900,
    rating: 4.9,
    reviewCount: 540,
    isFeatured: false,
    isBestSeller: false,
    badge: '0% Interest • 12 Months',
    colors: [
      {
        name: 'Space Black',
        hex: '#2E2F32',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Silver',
        hex: '#E2E3E5',
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80'
      }
    ],
    specs: [
      { id: 'ip-1', label: '256 GB Wi-Fi', storage: '256 GB', priceDelta: 0, inStock: true },
      { id: 'ip-2', label: '512 GB Wi-Fi', storage: '512 GB', priceDelta: 20000, inStock: true },
      { id: 'ip-3', label: '1 TB Wi-Fi (Nano-texture)', storage: '1 TB', priceDelta: 55000, inStock: true }
    ],
    highlights: [
      'Ultra Retina XDR display with Tandem OLED',
      'Apple M4 chip with Next-Gen Neural Engine',
      'Supports Apple Pencil Pro & Magic Keyboard',
      'Pledge mutual funds in 10 seconds without credit score checks'
    ],
    emiOptions: [
      { tenureMonths: 3, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 6, interestRate: 0, isNoCostEmi: true, processingFee: 0, lenderPartner: 'DSP Finance' },
      { tenureMonths: 12, interestRate: 0, isNoCostEmi: true, isPopular: true, processingFee: 0, lenderPartner: 'Tata Capital' },
      { tenureMonths: 18, interestRate: 6.99, isNoCostEmi: false, processingFee: 499, lenderPartner: '1Fi Credit' }
    ]
  }
];
