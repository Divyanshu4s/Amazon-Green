import { useQuery } from '@tanstack/react-query';

export const useSellerDashboard = () => {
  return useQuery({
    queryKey: ['sellerDashboard'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      return {
        profile: {
          businessName: 'EcoHome Essentials',
          badge: 'Climate Champion Seller',
          overallEcoScore: 88,
          scoreTrend: '+4.2',
          rank: 12,
          tier: 'Gold',
          auditStatus: 'Approved',
          lastAuditDate: '2026-05-12'
        },
        scoreBreakdown: [
          { name: 'Products', value: 92, fill: '#2E7D32' },
          { name: 'Packaging', value: 75, fill: '#81C784' },
          { name: 'Delivery', value: 85, fill: '#4CAF50' },
          { name: 'Certifications', value: 100, fill: '#1B5E20' }
        ],
        auditHistory: [
          { date: '2025-11-01', score: 72, status: 'Needs Review' },
          { date: '2026-02-15', score: 81, status: 'Approved' },
          { date: '2026-05-12', score: 88, status: 'Approved' }
        ],
        greenwashingRisk: {
          level: 'Low',
          warnings: [
            'Packaging claims for "EcoMug" require recent FSC verification.',
            'Ensure "Carbon Neutral" tag has updated 2026 documentation.'
          ]
        },
        revenueSustainabilityData: [
          { month: 'Jan', revenue: 45000, ecoScore: 78, sustainableRevenue: 20000 },
          { month: 'Feb', revenue: 52000, ecoScore: 81, sustainableRevenue: 28000 },
          { month: 'Mar', revenue: 58000, ecoScore: 81, sustainableRevenue: 34000 },
          { month: 'Apr', revenue: 65000, ecoScore: 84, sustainableRevenue: 42000 },
          { month: 'May', revenue: 78000, ecoScore: 88, sustainableRevenue: 58000 }
        ],
        packagingDeliveryStats: [
          { name: 'Eco Packaging', value: 65, fill: '#4CAF50' },
          { name: 'Standard Packaging', value: 35, fill: '#E0E0E0' }
        ],
        recommendations: [
          { id: 1, action: 'Switch to recycled cardboard packaging for Top-Selling Item', impact: '+3.5 EcoScore', carbonSaved: '120kg/month' },
          { id: 2, action: 'Upload updated ISO 14001 Certification', impact: '+5.0 EcoScore', carbonSaved: 'N/A' },
          { id: 3, action: 'Opt-in to Local Fulfillment in Seattle Hub', impact: '+2.1 EcoScore', carbonSaved: '45kg/month' }
        ],
        products: [
          { id: 'p1', name: 'Bamboo Toothbrush Set', stock: 450, ecoScore: 95, status: 'Verified' },
          { id: 'p2', name: 'Reusable Silicone Bags', stock: 120, ecoScore: 88, status: 'Verified' },
          { id: 'p3', name: 'Standard Plastic Tumbler', stock: 85, ecoScore: 42, status: 'Flagged' }
        ],
        impact: {
          carbonPrevented: 1450.5,
          greenOrders: 12450,
          plasticReduced: 850.2
        }
      };
    }
  });
};
