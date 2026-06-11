import { useQuery } from '@tanstack/react-query';

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      return {
        kpis: {
          totalUsers: 254000,
          totalSellers: 8450,
          verifiedSellers: 3200,
          totalOrders: 1450000,
          greenOrders: 680000,
          platformEcoScore: 74,
          climateImpactScore: 88
        },
        climatePledge: {
          carbonSavedKg: 4500000,
          targetCarbonKg: 10000000, // 10M kg
          treesEquivalent: 150000,
          plasticReducedKg: 850000,
          targetPlasticKg: 2000000
        },
        pendingAudits: [
          { id: 'a1', seller: 'GreenLife Goods', date: '2026-06-10', riskLevel: 'Medium', status: 'Pending Review' },
          { id: 'a2', seller: 'EcoTech Supplies', date: '2026-06-09', riskLevel: 'High', status: 'Flagged' },
          { id: 'a3', seller: 'Nature Beauty', date: '2026-06-11', riskLevel: 'Low', status: 'Pending Review' }
        ],
        greenwashingAlerts: [
          { id: 'gw1', seller: 'QuickShip Packaging', issue: 'Claims "100% Recyclable" but ML detects mixed plastics in SKU-884.', severity: 'Critical' },
          { id: 'gw2', seller: 'Organic Farm Co', issue: 'Missing USDA Organic Certification for 12 newly listed products.', severity: 'High' },
          { id: 'gw3', seller: 'EcoFashion Brand', issue: '"Carbon Neutral" tag used without linked offsetting documentation.', severity: 'Medium' }
        ],
        analytics: {
          greenAdoptionTrend: [
            { month: 'Jan', greenOrders: 45000, standardOrders: 120000 },
            { month: 'Feb', greenOrders: 52000, standardOrders: 115000 },
            { month: 'Mar', greenOrders: 68000, standardOrders: 110000 },
            { month: 'Apr', greenOrders: 85000, standardOrders: 100000 },
            { month: 'May', greenOrders: 110000, standardOrders: 90000 },
            { month: 'Jun', greenOrders: 140000, standardOrders: 85000 }
          ],
          ecoScoreDistribution: [
            { range: '0-20', count: 450 },
            { range: '21-40', count: 1200 },
            { range: '41-60', count: 3500 },
            { range: '61-80', count: 2800 },
            { range: '81-100', count: 500 }
          ]
        },
        insights: [
          'Platform-wide carbon savings increased by 18% this month due to Green Delivery defaults.',
          'Packaging optimization could reduce waste by 12% in the Electronics category.',
          '145 sellers require immediate certification review for expiring FSC documents.',
          'Group Delivery adoption is exceptionally high (45%) in Seattle and Portland.'
        ]
      };
    }
  });
};
