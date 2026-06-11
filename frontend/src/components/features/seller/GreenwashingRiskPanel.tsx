import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

interface Props {
  risk: any;
}

export const GreenwashingRiskPanel: React.FC<Props> = ({ risk }) => {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <ShieldAlert className="w-6 h-6 text-amazon-orange mr-2" />
        <h3 className="font-bold text-orange-900 text-lg">Greenwashing Risk Panel</h3>
      </div>
      
      <div className="mb-4">
        <span className="text-sm font-semibold text-orange-800">Current Risk Level: </span>
        <span className="text-sm font-black text-green-700 uppercase bg-green-100 px-2 py-0.5 rounded">{risk.level}</span>
      </div>

      <div className="space-y-3">
        {risk.warnings.map((warning: string, idx: number) => (
          <div key={idx} className="bg-white/60 border border-orange-200/50 p-3 rounded-lg flex items-start">
            <AlertTriangle className="w-4 h-4 text-amazon-orange mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-orange-900 font-medium">{warning}</span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full bg-white border border-orange-200 text-orange-700 font-bold py-2 rounded-lg text-sm hover:bg-orange-100 transition-colors">
        Review Compliance Docs
      </button>
    </div>
  );
};
