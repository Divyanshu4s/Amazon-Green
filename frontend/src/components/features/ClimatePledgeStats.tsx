import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { mockImpactStats } from '../../utils/mockData';
import { TreePine, Wind, Recycle, Truck } from 'lucide-react';

const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export const ClimatePledgeStats: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const stats = [
    { label: 'Carbon Saved (kg)', value: mockImpactStats.carbonSavedKg, icon: <Wind className="w-8 h-8 text-blue-400" /> },
    { label: 'Trees Equivalent', value: mockImpactStats.treesEquivalent, icon: <TreePine className="w-8 h-8 text-eco-primary" /> },
    { label: 'Plastic Saved (kg)', value: mockImpactStats.plasticSavedKg, icon: <Recycle className="w-8 h-8 text-yellow-500" /> },
    { label: 'Local Green Deliveries', value: mockImpactStats.localDeliveries, icon: <Truck className="w-8 h-8 text-purple-500" /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16 mx-4 md:mx-0">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Together, our community has saved</h2>
        <div className="w-16 h-1 bg-amazon-orange mx-auto mt-4 rounded"></div>
      </div>
      
      <div 
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
            }}
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl"
          >
            <div className="bg-white p-3 rounded-full shadow-sm mb-4">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {inView ? <AnimatedCounter end={stat.value} /> : '0'}
            </div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
