import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { CartItemList } from '../components/features/checkout/CartItemList';
import { Link, useNavigate } from 'react-router-dom';

const CartSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-8 space-y-4">
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
      <div className="xl:col-span-4">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export const Cart: React.FC = () => {
  const { items, totalPrice, totalCarbonSaved } = useCartStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading to demonstrate the CartSkeleton state
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your EcoCart is empty</h2>
        <Link to="/products" className="text-amazon-orange hover:underline font-semibold">Continue shopping</Link>
      </div>
    );
  }

  const tax = totalPrice * 0.08;
  const estimatedTotal = totalPrice + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <CartItemList />
        </div>

        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({items.reduce((acc, item) => acc + item.quantity, 0)}):</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {totalCarbonSaved > 0 && (
                <div className="flex justify-between text-eco-primary font-semibold pt-2 border-t mt-2">
                  <span>Carbon Savings:</span>
                  <span>{totalCarbonSaved.toFixed(1)} kg CO₂</span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-bold text-lg mt-6 mb-6 pt-4 border-t">
              <span>Order Total:</span>
              <span>${estimatedTotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-amazon-yellow hover:bg-yellow-500 text-black py-3 rounded-md font-bold transition-colors shadow-sm"
            >
              Proceed to Checkout
            </button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By proceeding, you agree to EcoCart's Terms of Service and Eco-Friendly Return Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
