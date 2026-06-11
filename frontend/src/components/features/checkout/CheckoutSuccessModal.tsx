import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  orderId: string;
  co2Saved: number;
  coinsEarned: number;
  onClose: () => void;
}

export const CheckoutSuccessModal: React.FC<Props> = ({ orderId, co2Saved, coinsEarned, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        <div className="bg-gradient-to-r from-eco-dark to-eco-primary p-8 text-center relative overflow-hidden">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-10 h-10 text-eco-primary" />
          </motion.div>
          <h2 className="text-2xl font-black text-white mb-2 relative z-10">Order Placed Successfully!</h2>
          <p className="text-green-100 relative z-10">Thank you for shopping sustainably with EcoCart.</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Order Reference</span>
            <div className="text-lg font-bold text-gray-900 mt-1">{orderId}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex flex-col items-center text-center">
              <Leaf className="w-8 h-8 text-eco-primary mb-2" />
              <div className="text-2xl font-black text-gray-900">{co2Saved.toFixed(1)}kg</div>
              <div className="text-xs text-gray-500 font-bold uppercase mt-1">CO₂ Prevented</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex flex-col items-center text-center">
              <Gift className="w-8 h-8 text-amazon-orange mb-2" />
              <div className="text-2xl font-black text-gray-900">+{coinsEarned}</div>
              <div className="text-xs text-gray-500 font-bold uppercase mt-1">Sapling Coins Earned</div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/dashboard" className="w-full bg-amazon-orange hover:bg-amazon-darkOrange text-gray-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
              View Your Impact Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
