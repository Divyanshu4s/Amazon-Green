import React from 'react';
import { Leaf } from 'lucide-react';

const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#232F3E] text-gray-300 pt-16 pb-8 mt-auto border-t-[6px] border-eco-primary">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        
        {/* Brand Section */}
        <div className="lg:col-span-2 pr-8">
          <div className="flex items-center space-x-2 text-2xl font-black tracking-tight text-white mb-6">
            <div className="bg-eco-primary p-1.5 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-sans">EcoCart <span className="text-amazon-orange font-bold">AI</span></span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            The world's most intelligent platform for sustainable shopping. Powered by AI to analyze 
            carbon footprints, ethical sourcing, and environmental impact so you can shop guilt-free.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-eco-primary hover:text-white transition-all"><TwitterIcon /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-eco-primary hover:text-white transition-all"><FacebookIcon /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-eco-primary hover:text-white transition-all"><InstagramIcon /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-eco-primary hover:text-white transition-all"><GithubIcon /></a>
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h4 className="text-white font-bold mb-6 text-base">Get to Know Us</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">About EcoCart AI</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Sustainability Report</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Green Sellers Program</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">EcoScore Methodology</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-base">Make Money with Us</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Sell on EcoCart</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Become a Verified Green Seller</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Affiliate Program</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Fulfillment by EcoCart</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-base">Green Impact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Your Carbon Savings</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Trees Planted Tracker</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Rewards Dashboard</a></li>
            <li><a href="#" className="hover:text-amazon-orange hover:underline transition-colors">Community Pledges</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-gray-700 px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-6 text-sm mb-4 md:mb-0">
          <a href="#" className="hover:text-white transition-colors">Conditions of Use</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
          <a href="#" className="hover:text-white transition-colors">Consumer Health Data</a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EcoCart AI. All rights reserved. Built for a sustainable future.
        </p>
      </div>
    </footer>
  );
};
