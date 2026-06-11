export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  greenCredits: number;
  ecoLevel: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  seller: string;
  ecoScore: number;
  images: string[];
  isLocal?: boolean;
  plasticFree?: boolean;
  compostablePackaging?: boolean;
  greenDeliveryEligible?: boolean;
  verifiedSeller?: boolean;
}
