import React, { useEffect, useState } from 'react';
import { Wind, TreePine, Recycle, Gift } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Props {
  summary: any;
  wallet: any;
}

export const ImpactHeroCards: React.FC<Props> = ({ summary, wallet }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <AnimatedCard 
        title="Total CO₂ Saved" 
        value={summary.totalCarbonSavedKg} 
        unit="kg" 
        icon={<Wind className="w-6 h-6 text-eco-primary" />} 
        colorClass="bg-green-50 border-green-100 text-green-900"
      />
      <AnimatedCard 
        title="Trees Equivalent" 
        value={summary.treesEquivalent} 
        unit="" 
        icon={<TreePine className="w-6 h-6 text-eco-dark" />} 
        colorClass="bg-emerald-50 border-emerald-100 text-emerald-900"
      />
      <AnimatedCard 
        title="Waste Prevented" 
        value={summary.plasticWasteReducedKg + summary.packagingWasteReducedKg} 
        unit="kg" 
        icon={<Recycle className="w-6 h-6 text-blue-500" />} 
        colorClass="bg-blue-50 border-blue-100 text-blue-900"
      />
      <AnimatedCard 
        title="Sapling Coins" 
        value={wallet.balance} 
        unit="" 
        icon={<Gift className="w-6 h-6 text-amazon-orange" />} 
        colorClass="bg-yellow-50 border-yellow-100 text-yellow-900"
      />
    </div>
  );
};

const AnimatedCard: React.FC<{ title: string, value: number, unit: string, icon: React.ReactNode, colorClass: string }> = ({ title, value, unit, icon, colorClass }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className={`border rounded-xl p-6 flex flex-col justify-between ${colorClass}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold opacity-80 uppercase tracking-wider text-xs">{title}</h3>
        {icon}
      </div>
      <div className="text-3xl font-black">
        {count % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}<span className="text-xl ml-1">{unit}</span>
      </div>
    </motion.div>
  );
};
