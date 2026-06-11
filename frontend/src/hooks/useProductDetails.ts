import { useQuery } from '@tanstack/react-query';
import { mockProductDetails } from '../utils/mockData';
import { apiClient } from '../services/api.client';

export const useProductDetails = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      // Simulate network delay for realistic UX testing
      await new Promise(resolve => setTimeout(resolve, 1200));

      // In production, we would call:
      // const response = await apiClient.get(`/products/${productId}`);
      // return response.data.data;
      
      // For now, return mock detailed data
      if (productId === 'p1' || !productId) {
         return mockProductDetails;
      }
      
      // Fallback mutation of mock data if they click a different product
      return {
        ...mockProductDetails,
        id: productId,
        name: `Sustainable Product ${productId}`,
        ecoScore: Math.floor(Math.random() * 40) + 60, // Random 60-100
      };
    },
    enabled: !!productId,
  });
};
