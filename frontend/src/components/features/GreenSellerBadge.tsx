import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

interface GreenSellerBadgeProps {
  level: 'verified_green_seller' | 'local_sustainability_leader' | 'packaging_champion' | 'climate_champion' | 'eco_innovation_award';
  className?: string;
}

export const GreenSellerBadge: React.FC<GreenSellerBadgeProps> = ({ level, className }) => {
  const badgeConfig = {
    verified_green_seller: { label: 'Verified Green', color: 'bg-green-100 text-green-800 border-green-200' },
    local_sustainability_leader: { label: 'Local Leader', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    packaging_champion: { label: 'Packaging Champ', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    climate_champion: { label: 'Climate Champion', color: 'bg-amazon-orange text-white border-amazon-darkOrange' },
    eco_innovation_award: { label: 'Eco Innovator', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  };

  const config = badgeConfig[level] || badgeConfig.verified_green_seller;

  return (
    <div className={cn(
      "inline-flex items-center justify-center px-2 py-1 rounded border text-xs font-semibold",
      config.color,
      className
    )}>
      <ShieldCheck className="w-3 h-3 mr-1" />
      {config.label}
    </div>
  );
};
