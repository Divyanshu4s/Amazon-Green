import React from 'react';
import { GreenSellerBadge } from '../GreenSellerBadge';
import { ShieldCheck, Award, Calendar } from 'lucide-react';
import { mockSellers } from '../../../utils/mockData';

export const SellerSustainabilityCard: React.FC<{ sellerName: string }> = ({ sellerName }) => {
  const sellerInfo = mockSellers.find(s => s.name === sellerName);

  if (!sellerInfo) return null;

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Seller Profile</h3>
        <GreenSellerBadge level={sellerInfo.badge as any} />
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-bold text-2xl text-amazon-orange">
          {sellerInfo.name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-xl text-gray-900">{sellerInfo.name}</div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <ShieldCheck className="w-4 h-4 text-green-500 mr-1" /> Verified Green Partner
          </div>
        </div>
        <div className="ml-auto text-center">
          <div className="text-3xl font-black text-eco-dark">{sellerInfo.ecoScore}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold">EcoScore</div>
        </div>
      </div>

      {sellerInfo.certifications && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Active Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {sellerInfo.certifications.map((cert, idx) => (
              <span key={idx} className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2 py-1 rounded font-medium">
                <Award className="w-3 h-3 mr-1" /> {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 flex items-center mt-4 pt-4 border-t border-gray-100">
        <Calendar className="w-3 h-3 mr-1" /> Last Audited: {sellerInfo.verifiedDate}
      </div>
    </div>
  );
};
