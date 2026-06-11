import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardSkeleton } from '../components/features/dashboard/DashboardSkeleton';
import { ImpactHeroCards } from '../components/features/dashboard/ImpactHeroCards';
import { EcoLevelBanner } from '../components/features/dashboard/EcoLevelBanner';
import { CarbonTrendChart } from '../components/features/dashboard/CarbonTrendChart';
import { RecentActivityTimeline } from '../components/features/dashboard/RecentActivityTimeline';
import { BadgeShowcase } from '../components/features/dashboard/BadgeShowcase';
import { ActiveGoalsChallenges } from '../components/features/dashboard/ActiveGoalsChallenges';

export const Dashboard: React.FC = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading || !data) return <DashboardSkeleton />;
  if (isError) return <div className="p-8 text-center text-red-500 font-bold">Failed to load Dashboard data.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Your Impact Dashboard</h1>

      {/* Top Section */}
      <ImpactHeroCards summary={data.impactSummary} wallet={data.wallet} />
      <EcoLevelBanner ecoLevel={data.ecoLevel} />

      {/* Badges Section */}
      <BadgeShowcase badges={data.badges} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Middle Section (Analytics) */}
        <div className="lg:col-span-2 space-y-8">
          <CarbonTrendChart data={data.carbonTrend} />
        </div>

        {/* Right Sidebar (Timeline & Goals) */}
        <div className="lg:col-span-1 space-y-8">
          <ActiveGoalsChallenges goals={data.activeGoals} />
          <RecentActivityTimeline timeline={data.timeline} />
        </div>

      </div>
    </div>
  );
};
