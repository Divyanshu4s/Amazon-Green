export const mockProducts = [
  {
    id: 'p1',
    name: 'Bamboo Toothbrush (Pack of 4) - 100% Biodegradable',
    description: 'Eco-friendly alternative to plastic toothbrushes.',
    price: 12.99,
    category: 'Home',
    seller: 'EcoRoots',
    ecoScore: 92,
    images: ['https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&q=80&w=400'],
    carbonSavingsKg: 0.5,
    isLocal: false,
    greenDeliveryEligible: true,
    materialType: 'Bamboo',
    sellerBadge: 'climate_champion',
    plasticFree: true,
    compostablePackaging: true,
    verifiedSeller: true
  },
  {
    id: 'p2',
    name: 'Reusable Silicone Storage Bags',
    description: 'Leakproof, dishwasher safe, plastic-free.',
    price: 24.50,
    category: 'Kitchen',
    seller: 'GreenLife Solutions',
    ecoScore: 85,
    images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=400'],
    carbonSavingsKg: 2.1,
    isLocal: true,
    distanceKm: 4.2,
    greenDeliveryEligible: true,
    materialType: 'Silicone',
    sellerBadge: 'packaging_champion',
    plasticFree: true,
    compostablePackaging: false,
    verifiedSeller: true
  },
  {
    id: 'p3',
    name: 'Recycled Ocean Plastic Backpack',
    description: 'Durable everyday backpack made from 100% recycled ocean plastic.',
    price: 65.00,
    category: 'Fashion',
    seller: 'OceanWear',
    ecoScore: 95,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400'],
    carbonSavingsKg: 5.4,
    isLocal: false,
    greenDeliveryEligible: true,
    materialType: 'Recycled Plastic',
    sellerBadge: 'eco_innovation_award',
    plasticFree: false,
    compostablePackaging: false,
    verifiedSeller: true
  },
  {
    id: 'p4',
    name: 'Compostable Coffee Pods (60 Pack)',
    description: 'Fair trade organic coffee in 100% compostable pods.',
    price: 34.99,
    category: 'Food',
    seller: 'FairRoast Coffee',
    ecoScore: 88,
    images: ['https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=400'],
    carbonSavingsKg: 1.2,
    isLocal: true,
    distanceKm: 8.5,
    greenDeliveryEligible: true,
    materialType: 'Compostable',
    sellerBadge: 'local_sustainability_leader',
    plasticFree: true,
    compostablePackaging: true,
    verifiedSeller: true
  },
  {
    id: 'p5',
    name: 'Standard Plastic Water Bottle',
    description: 'BPA free water bottle.',
    price: 9.99,
    category: 'Home',
    seller: 'MegaStore',
    ecoScore: 35,
    images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=400'],
    carbonSavingsKg: 0,
    isLocal: false,
    greenDeliveryEligible: false,
    materialType: 'Plastic',
    sellerBadge: null,
    plasticFree: false,
    compostablePackaging: false,
    verifiedSeller: false
  }
];

export const mockImpactStats = {
  carbonSavedKg: 1254300,
  treesEquivalent: 45200,
  plasticSavedKg: 890500,
  localDeliveries: 124000
};

export const mockSellers = [
  { id: 's1', name: 'EcoRoots', ecoScore: 94, badge: 'climate_champion', verifiedDate: '2025-10-15', certifications: ['B-Corp', '1% for the Planet', 'Carbon Neutral'] },
  { id: 's2', name: 'OceanWear', ecoScore: 91, badge: 'eco_innovation_award', verifiedDate: '2026-01-22', certifications: ['OceanBound Plastic Certified'] },
  { id: 's3', name: 'GreenLife Solutions', ecoScore: 85, badge: 'packaging_champion', verifiedDate: '2025-11-05', certifications: ['FSC Certified'] },
  { id: 's4', name: 'FairRoast Coffee', ecoScore: 82, badge: 'local_sustainability_leader', verifiedDate: '2026-03-10', certifications: ['Fair Trade', 'USDA Organic'] }
];

export const mockProductDetails = {
  id: 'p1',
  name: 'Bamboo Toothbrush (Pack of 4) - 100% Biodegradable & Compostable Handle',
  description: 'Switch to a sustainable morning routine. Our bamboo toothbrushes feature 100% compostable handles and BPA-free soft bristles. Ergonomically designed and sustainably harvested.',
  price: 12.99,
  discount: 15,
  availability: 'In Stock',
  category: 'Home & Personal Care',
  seller: 'EcoRoots',
  ecoScore: 92,
  ecoGrade: 'A+',
  confidence: 96,
  images: [
    'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800'
  ],
  carbonSavingsKg: 0.5,
  isLocal: false,
  specifications: {
    'Material': 'Moso Bamboo, Nylon-4 bristles',
    'Lifespan': '3-4 months per brush',
    'Disposal': 'Remove bristles, compost handle',
    'Packaging': 'Recycled Kraft Paper'
  },
  aiExplanations: [
    "Uses fast-growing, highly renewable Moso Bamboo.",
    "Packaging is 100% plastic-free and fully recyclable.",
    "Saves approximately 4 plastic toothbrushes from landfills per year."
  ],
  scoreBreakdown: [
    { name: 'Material', score: 95, fill: '#2E7D32' },
    { name: 'Packaging', score: 98, fill: '#4CAF50' },
    { name: 'Durability', score: 80, fill: '#81C784' },
    { name: 'Locality', score: 65, fill: '#A5D6A7' },
    { name: 'User Impact', score: 90, fill: '#C8E6C9' }
  ],
  mlAudit: {
    score: 94,
    riskLevel: 'Low',
    strengths: ['Transparent supply chain', 'Verified compostability claims'],
    improvements: ['Consider plant-based bristles to replace Nylon-4']
  },
  deliveryOptions: [
    { type: 'Standard Delivery', time: 'Tomorrow by 9 PM', co2: 1.2, cost: 0, coins: 0 },
    { type: 'Green Delivery', time: 'Thursday by 9 PM', co2: 0.4, cost: 0, coins: 50, description: 'Electric vehicle delivery routing' },
    { type: 'Group Delivery', time: 'Saturday (Your Eco-Day)', co2: 0.1, cost: 0, coins: 150, description: 'Wait and group with neighborhood orders' }
  ],
  packagingOptions: [
    { type: 'Standard Packaging', wasteSaved: 0, cost: 0, coins: 0 },
    { type: 'Minimal Packaging', wasteSaved: 0.2, cost: 0, coins: 20, description: 'Ships in product box without outer Amazon box' },
    { type: 'Eco Packaging', wasteSaved: 0.5, cost: 1.5, coins: 100, description: 'Reusable zero-waste tote bag' }
  ]
};
