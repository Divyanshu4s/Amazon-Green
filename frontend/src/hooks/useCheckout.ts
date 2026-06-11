import { useQuery, useMutation } from '@tanstack/react-query';
import { useCartStore } from '../store/useCartStore';

export const useCheckout = () => {
  const { items, clearCart } = useCartStore();

  // Fetch Delivery & Packaging Options based on Cart
  const { data: options, isLoading: isLoadingOptions } = useQuery({
    queryKey: ['checkoutOptions', items],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

      return {
        deliveryOptions: [
          { id: 'd1', type: 'Standard Delivery', time: 'Tomorrow by 9 PM', co2: 2.5, cost: 5.99, coins: 0 },
          { id: 'd2', type: 'Green Delivery', time: 'Thursday by 9 PM', co2: 0.7, cost: 0, coins: 50, description: 'Electric vehicle delivery routing', recommended: true },
          { id: 'd3', type: 'Group Delivery', time: 'Saturday (Your Eco-Day)', co2: 0.2, cost: 0, coins: 150, description: 'Wait and group with neighborhood orders', participants: 4 }
        ],
        packagingOptions: [
          { id: 'p1', type: 'Standard Packaging', wasteSaved: 0, cost: 0, coins: 0 },
          { id: 'p2', type: 'Minimal Packaging', wasteSaved: 0.4, cost: 0, coins: 20, description: 'Ships in product box without outer Amazon box' },
          { id: 'p3', type: 'Compostable Packaging', wasteSaved: 0.8, cost: 1.5, coins: 100, description: '100% biodegradable mailers', recommended: true }
        ],
        insights: [
          "Buying locally reduced delivery emissions by 32%",
          "Switching to Eco Packaging saves an additional 2.4kg CO₂",
          "You are 120 coins away from Climate Champion level"
        ]
      };
    },
    enabled: items.length > 0
  });

  // Simulated Checkout Mutation
  const placeOrderMutation = useMutation({
    mutationFn: async (orderPayload: any) => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      // return axios.post('/api/orders', orderPayload);
      return { success: true, orderId: `ECO-${Math.floor(Math.random() * 1000000)}`, ...orderPayload };
    },
    onSuccess: () => {
      // In a real app we might not clear cart immediately until modal is dismissed,
      // but for logic flow we clear it here or handle it in the component.
    }
  });

  return {
    options,
    isLoadingOptions,
    placeOrder: placeOrderMutation.mutateAsync,
    isPlacingOrder: placeOrderMutation.isPending
  };
};
