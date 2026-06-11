import React from 'react';
import { ShieldAlert, AlertOctagon, Check, X, Search } from 'lucide-react';

interface Props {
  alerts: any[];
}

export const GreenwashingDetectionCenter: React.FC<Props> = ({ alerts }) => {
  return (
    <div className="bg-white border border-red-200 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-red-100 flex justify-between items-center bg-red-50/50">
        <h3 className="font-bold text-red-900 text-lg flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-red-600" /> Greenwashing Detection Center
        </h3>
        <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">{alerts.length} Active Alerts</span>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <th className="p-4 font-bold">Severity</th>
              <th className="p-4 font-bold">Seller</th>
              <th className="p-4 font-bold">ML Detected Issue</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {alerts.map(alert => (
              <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold flex items-center w-max ${
                    alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                    alert.severity === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity === 'Critical' && <AlertOctagon className="w-3 h-3 mr-1" />}
                    {alert.severity}
                  </span>
                </td>
                <td className="p-4 font-semibold text-gray-900">{alert.seller}</td>
                <td className="p-4 text-gray-600 max-w-xs">{alert.issue}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded tooltip" title="Investigate">
                      <Search className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded tooltip" title="Suspend Seller">
                      <X className="w-4 h-4" />
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
