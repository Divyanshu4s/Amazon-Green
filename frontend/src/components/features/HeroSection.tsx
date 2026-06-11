import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-[#131921] text-white overflow-hidden rounded-[2rem] shadow-2xl mb-16 mt-6 mx-4 xl:mx-0 border border-gray-800">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
          alt="Sustainable Forest" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131921] via-[#131921]/95 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#131921] to-transparent"></div>
      </div>

      <div className="relative z-10 px-8 py-24 md:py-32 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-2/3 pr-0 md:pr-12"
        >
          <div className="inline-flex items-center bg-eco-primary/20 text-eco-light border border-eco-primary/30 px-4 py-1.5 rounded-full text-sm font-bold mb-8 uppercase tracking-widest shadow-sm">
            <Leaf className="w-4 h-4 mr-2 text-eco-secondary" />
            The Future of E-Commerce
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            Shop Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-secondary to-green-300">
              Shop Greener.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-medium leading-relaxed">
            Discover eco-friendly products, reduce your carbon footprint, and earn premium rewards. 
            The intelligent marketplace designed for a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/products" className="bg-amazon-orange hover:bg-amazon-darkOrange text-gray-900 font-black px-10 py-5 rounded-xl flex items-center justify-center transition-all transform hover:scale-105 shadow-xl hover:shadow-amazon-orange/20 text-lg">
              Explore Green Products
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link to="/rewards" className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-10 py-5 rounded-xl border border-gray-600 flex items-center justify-center transition-all shadow-lg text-lg">
              View Your Impact
            </Link>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="hidden md:flex w-1/3 flex-col space-y-6"
        >
          {/* Trust badges */}
          <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-2xl transform translate-x-12 translate-y-8">
            <div className="flex items-center space-x-4 mb-2">
              <div className="bg-blue-500/20 p-3 rounded-full"><ShieldCheck className="text-blue-400 w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-white text-lg">AI Verified Sellers</h3>
                <p className="text-gray-400 text-sm">Every brand is authenticated.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-2xl transform -translate-x-4">
            <div className="flex items-center space-x-4 mb-2">
              <div className="bg-eco-primary/20 p-3 rounded-full"><Leaf className="text-eco-secondary w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-white text-lg">Zero Carbon Delivery</h3>
                <p className="text-gray-400 text-sm">100% offset on all logistics.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-2xl transform translate-x-8">
            <div className="flex items-center space-x-4 mb-2">
              <div className="bg-amazon-orange/20 p-3 rounded-full"><Zap className="text-amazon-orange w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-white text-lg">Smart EcoScore</h3>
                <p className="text-gray-400 text-sm">Powered by deep learning.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
