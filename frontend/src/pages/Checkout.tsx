import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useCheckout } from '../hooks/useCheckout';
import { CartItemList } from '../components/features/checkout/CartItemList';
import { CheckoutDeliverySelector } from '../components/features/checkout/CheckoutDeliverySelector';
import { CheckoutPackagingSelector } from '../components/features/checkout/CheckoutPackagingSelector';
import { SustainabilityComparisonPanel } from '../components/features/checkout/SustainabilityComparisonPanel';
import { CarbonImpactVisualizer } from '../components/features/checkout/CarbonImpactVisualizer';
import { CheckoutInsights } from '../components/features/checkout/CheckoutInsights';
import { OrderSummaryBox } from '../components/features/checkout/OrderSummaryBox';
import { CheckoutSuccessModal } from '../components/features/checkout/CheckoutSuccessModal';
import { CheckoutSkeleton } from '../components/features/checkout/CheckoutSkeleton';
import { Link, useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { items, totalPrice, totalCarbonSaved, clearCart } = useCartStore();
  const { options, isLoadingOptions, placeOrder, isPlacingOrder } = useCheckout();
  const navigate = useNavigate();

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>('d1');
  const [selectedPackagingId, setSelectedPackagingId] = useState<string>('p1');
  const [successData, setSuccessData] = useState<any>(null);

  if (items.length === 0 && !successData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your EcoCart is empty</h2>
        <Link to="/products" className="text-amazon-orange hover:underline font-semibold">Continue shopping</Link>
      </div>
    );
  }

  if (isLoadingOptions || !options) {
    return <CheckoutSkeleton />;
  }

  // Derived State Computations
  const currentDelivery = options.deliveryOptions.find(d => d.id === selectedDeliveryId) || options.deliveryOptions[0];
  const currentPackaging = options.packagingOptions.find(p => p.id === selectedPackagingId) || options.packagingOptions[0];
  
  const bestDelivery = options.deliveryOptions.find(d => d.recommended) || options.deliveryOptions[0];
  const bestPackaging = options.packagingOptions.find(p => p.recommended) || options.packagingOptions[0];

  const totalCoins = items.reduce((acc, item) => acc + (item.product.ecoScore > 80 ? 10 : 0), 0) + currentDelivery.coins + currentPackaging.coins;
  const totalNetCO2Saved = totalCarbonSaved + (2.5 - currentDelivery.co2);

  const handlePlaceOrder = async () => {
    try {
      const result = await placeOrder({
        items,
        deliveryId: selectedDeliveryId,
        packagingId: selectedPackagingId,
        total: totalPrice + currentDelivery.cost + currentPackaging.cost
      });
      
      setSuccessData({
        orderId: result.orderId,
        co2Saved: totalNetCO2Saved,
        coinsEarned: totalCoins
      });
      
    } catch (err) {
      alert("Checkout failed. Please try again.");
    }
  };

  const handleCloseSuccess = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Selections */}
        <div className="xl:col-span-8">
          <CartItemList />
          <CheckoutDeliverySelector 
            options={options.deliveryOptions} 
            selectedId={selectedDeliveryId} 
            onSelect={setSelectedDeliveryId} 
          />
          <CheckoutPackagingSelector 
            options={options.packagingOptions} 
            selectedId={selectedPackagingId} 
            onSelect={setSelectedPackagingId} 
          />
        </div>

        {/* Right Column: Insights & Summary */}
        <div className="xl:col-span-4 space-y-6">
          <CarbonImpactVisualizer 
            totalItemSavings={totalCarbonSaved} 
            deliveryCO2={currentDelivery.co2} 
            packagingWasteSaved={currentPackaging.wasteSaved} 
          />
          
          <SustainabilityComparisonPanel 
            currentDelivery={currentDelivery}
            currentPackaging={currentPackaging}
            bestDelivery={bestDelivery}
            bestPackaging={bestPackaging}
          />
          
          <CheckoutInsights insights={options.insights} />

          <OrderSummaryBox 
            subtotal={totalPrice}
            shipping={currentDelivery.cost}
            packagingCost={currentPackaging.cost}
            tax={totalPrice * 0.08}
            totalCoinsEarned={totalCoins}
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
          />
        </div>

      </div>

      {successData && (
        <CheckoutSuccessModal 
          orderId={successData.orderId}
          co2Saved={successData.co2Saved}
          coinsEarned={successData.coinsEarned}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
};
