import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { SellerLayout } from '../layouts/SellerLayout';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { ProductDetails } from '../pages/ProductDetails';
import { Checkout } from '../pages/Checkout';
import { Dashboard } from '../pages/Dashboard';
import { SellerDashboard } from '../pages/SellerDashboard';
import { AdminDashboard } from '../pages/AdminDashboard';

import { Cart } from '../pages/Cart';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* Seller Routes */}
      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SellerDashboard />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
