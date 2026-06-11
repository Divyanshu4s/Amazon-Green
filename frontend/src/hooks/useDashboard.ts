import { useQuery } from '@tanstack/react-query';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['userDashboard'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      return {
        impactSummary: {
          totalCarbonSavedKg: 142.5,
          plasticWasteReducedKg: 8.2,
          packagingWasteReducedKg: 15.4,
          treesEquivalent: 21.3,
          greenPurchases: 34,
          localPurchases: 12,
          groupDeliveriesJoined: 8
        },
        ecoLevel: {
          current: 'Eco Warrior',
          points: 3450,
          nextLevel: 'Earth Guardian',
          pointsRequired: 5000,
          benefits: ['Free Green Delivery', 'Double Sapling Coins', 'Priority Support']
        },
        wallet: {
          balance: 850,
          totalEarned: 2450,
          totalSpent: 1600
        },
        carbonTrend: [
          { month: 'Jan', co2: 12 },
          { month: 'Feb', co2: 15 },
          { month: 'Mar', co2: 10 },
          { month: 'Apr', co2: 22 },
          { month: 'May', co2: 28 },
          { month: 'Jun', co2: 55 } // Large spike from recent purchases
        ],
        badges: [
          { id: 'b1', name: 'First Green Purchase', icon: '🌱', earnedDate: '2025-01-15' },
          { id: 'b2', name: 'Plastic Free Hero', icon: '🌊', earnedDate: '2025-03-22' },
          { id: 'b3', name: 'Carbon Saver', icon: '💨', earnedDate: '2025-05-10' },
          { id: 'b4', name: 'Local Supporter', icon: '🏘️', earnedDate: '2026-01-05' },
          { id: 'b5', name: 'Climate Champion', icon: '🌍', locked: true, progress: 65 }
        ],
        timeline: [
          { id: 1, type: 'purchase', title: 'Purchased Eco Product', date: 'Today', impact: '+2.4kg CO₂ saved' },
          { id: 2, type: 'delivery', title: 'Joined Group Delivery', date: '2 days ago', impact: '+150 Coins' },
          { id: 3, type: 'badge', title: 'Earned "Local Supporter" Badge', date: '1 week ago', impact: '' },
          { id: 4, type: 'reward', title: 'Redeemed: Planted a Tree', date: '2 weeks ago', impact: '-500 Coins' }
        ],
        activeGoals: [
          { id: 'g1', title: 'Save 200kg CO₂', current: 142.5, target: 200, reward: 500 },
          { id: 'g2', title: 'Buy 50 Sustainable Products', current: 34, target: 50, reward: 200 }
        ],
        leaderboard: {
          rank: 1245,
          topPercentile: 12,
          communityTotalCo2: 254000
        }
      };
    }
  });
};
