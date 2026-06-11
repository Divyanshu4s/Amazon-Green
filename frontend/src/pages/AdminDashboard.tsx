import React from 'react';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { AdminDashboardSkeleton } from '../components/features/admin/AdminDashboardSkeleton';
import { PlatformHeroKPIs } from '../components/features/admin/PlatformHeroKPIs';
import { ClimatePledgeTracker } from '../components/features/admin/ClimatePledgeTracker';
import { GreenwashingDetectionCenter } from '../components/features/admin/GreenwashingDetectionCenter';
import { SellerVerificationCenter } from '../components/features/admin/SellerVerificationCenter';
import { PlatformAnalyticsCharts } from '../components/features/admin/PlatformAnalyticsCharts';
import { AIInsightsCenter } from '../components/features/admin/AIInsightsCenter';

export const AdminDashboard: React.FC = () => {
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading || !data) return <AdminDashboardSkeleton />;
  if (isError) return <div className="p-8 text-center text-red-500 font-bold">Failed to load Admin Command Center.</div>;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">Admin Command Center</h1>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">Export Reports</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700">Manage Rules</button>
        </div>
      </div>

      {/* Top Fold: Global Impact */}
      <PlatformHeroKPIs kpis={data.kpis} />
      <ClimatePledgeTracker pledge={data.climatePledge} />

      {/* Middle Fold: Operations & Compliance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        <GreenwashingDetectionCenter alerts={data.greenwashingAlerts} />
        <SellerVerificationCenter audits={data.pendingAudits} />
      </div>

      {/* Bottom Fold: Deep Analytics & AI Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <PlatformAnalyticsCharts data={data.analytics.greenAdoptionTrend} />
        </div>
        <div className="xl:col-span-1">
          <AIInsightsCenter insights={data.insights} />
        </div>
      </div>

    </div>
  );
};
