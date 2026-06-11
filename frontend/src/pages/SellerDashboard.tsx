import React from 'react';
import { useSellerDashboard } from '../hooks/useSellerDashboard';
import { SellerDashboardSkeleton } from '../components/features/seller/SellerDashboardSkeleton';
import { SellerHeroSection } from '../components/features/seller/SellerHeroSection';
import { SellerEcoScoreCard } from '../components/features/seller/SellerEcoScoreCard';
import { AuditStatusPanel } from '../components/features/seller/AuditStatusPanel';
import { GreenwashingRiskPanel } from '../components/features/seller/GreenwashingRiskPanel';
import { RevenueSustainabilityChart } from '../components/features/seller/RevenueSustainabilityChart';
import { PackagingDeliveryAnalytics } from '../components/features/seller/PackagingDeliveryAnalytics';
import { AIImprovementRecommendations } from '../components/features/seller/AIImprovementRecommendations';
import { ProductManagementTable } from '../components/features/seller/ProductManagementTable';

export const SellerDashboard: React.FC = () => {
  const { data, isLoading, isError } = useSellerDashboard();

  if (isLoading || !data) return <SellerDashboardSkeleton />;
  if (isError) return <div className="p-8 text-center text-red-500 font-bold">Failed to load Seller Dashboard data.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen font-sans">
      
      {/* Top Fold: Hero */}
      <SellerHeroSection profile={data.profile} impact={data.impact} />

      {/* Upper Grid: Score, Audit, Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <SellerEcoScoreCard profile={data.profile} scoreBreakdown={data.scoreBreakdown} />
        <AuditStatusPanel history={data.auditHistory} currentStatus={data.profile.auditStatus} />
        <GreenwashingRiskPanel risk={data.greenwashingRisk} />
      </div>

      {/* Middle Grid: Deep Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <RevenueSustainabilityChart data={data.revenueSustainabilityData} />
        </div>
        <div className="lg:col-span-1">
          <PackagingDeliveryAnalytics data={data.packagingDeliveryStats} />
        </div>
      </div>

      {/* Bottom Fold: Actions & Management */}
      <AIImprovementRecommendations recommendations={data.recommendations} />
      <ProductManagementTable products={data.products} />

    </div>
  );
};
