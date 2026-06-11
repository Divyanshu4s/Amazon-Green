import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Props {
  audits: any[];
}

export const SellerVerificationCenter: React.FC<Props> = ({ audits }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-900 text-lg">Seller Verification & ML Audits</h3>
        <button className="text-sm font-bold text-amazon-orange hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <th className="p-4 font-bold">Seller</th>
              <th className="p-4 font-bold">Audit Date</th>
              <th className="p-4 font-bold">ML Risk Level</th>
              <th className="p-4 font-bold text-right">Admin Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {audits.map(audit => (
              <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900">{audit.seller}</td>
                <td className="p-4 text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> {audit.date}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    audit.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                    audit.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'
                  }`}>
                    {audit.riskLevel}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded" title="Approve Verification">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
