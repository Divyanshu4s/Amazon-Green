import React from 'react';
import { ShoppingBag, Truck, Award, Gift } from 'lucide-react';

interface Props {
  timeline: any[];
}

export const RecentActivityTimeline: React.FC<Props> = ({ timeline }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'purchase': return <ShoppingBag className="w-4 h-4 text-white" />;
      case 'delivery': return <Truck className="w-4 h-4 text-white" />;
      case 'badge': return <Award className="w-4 h-4 text-white" />;
      case 'reward': return <Gift className="w-4 h-4 text-white" />;
      default: return <div className="w-2 h-2 bg-white rounded-full" />;
    }
  };

  const getColor = (type: string) => {
    switch(type) {
      case 'purchase': return 'bg-blue-500';
      case 'delivery': return 'bg-green-500';
      case 'badge': return 'bg-amazon-orange';
      case 'reward': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
      <h3 className="font-bold text-gray-900 text-lg mb-6">Recent Impact Activity</h3>
      
      <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
        {timeline.map((item, idx) => (
          <div key={item.id} className="relative pl-6">
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${getColor(item.type)}`}>
              {getIcon(item.type)}
            </div>
            
            {/* Content */}
            <div>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <span className="text-xs text-gray-400 font-medium">{item.date}</span>
              </div>
              {item.impact && (
                <div className={`text-xs font-bold ${item.impact.includes('-') ? 'text-gray-500' : 'text-eco-primary'}`}>
                  {item.impact}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
