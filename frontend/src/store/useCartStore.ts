import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCarbonSaved: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalCarbonSaved: 0,
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        let newItems;
        if (existingItem) {
          newItems = items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, { product, quantity }];
        }

        // Calculate totals
        const totalPrice = newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        
        // Mock carbon savings calculation: higher ecoScore = more carbon saved
        const totalCarbonSaved = newItems.reduce((acc, item) => acc + ((item.product.ecoScore / 100) * 1.5 * item.quantity), 0);

        set({ items: newItems, totalPrice, totalCarbonSaved });
      },
      removeItem: (productId) => {
        const newItems = get().items.filter(item => item.product.id !== productId);
        const totalPrice = newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        const totalCarbonSaved = newItems.reduce((acc, item) => acc + ((item.product.ecoScore / 100) * 1.5 * item.quantity), 0);
        
        set({ items: newItems, totalPrice, totalCarbonSaved });
      },
      updateQuantity: (productId, quantity) => {
        const newItems = get().items.map(item => 
          item.product.id === productId ? { ...item, quantity } : item
        );
        const totalPrice = newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        const totalCarbonSaved = newItems.reduce((acc, item) => acc + ((item.product.ecoScore / 100) * 1.5 * item.quantity), 0);
        
        set({ items: newItems, totalPrice, totalCarbonSaved });
      },
      clearCart: () => set({ items: [], totalPrice: 0, totalCarbonSaved: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
