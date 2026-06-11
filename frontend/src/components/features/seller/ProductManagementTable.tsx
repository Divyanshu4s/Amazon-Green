import React from 'react';
import { Edit2, MoreVertical } from 'lucide-react';

interface Props {
  products: any[];
}

export const ProductManagementTable: React.FC<Props> = ({ products }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-900 text-lg">Product Sustainability Management</h3>
        <button className="bg-amazon-orange hover:bg-amazon-darkOrange text-gray-900 font-bold py-2 px-4 rounded text-sm transition-colors">
          Add New Product
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <th className="p-4 font-bold">Product Name</th>
              <th className="p-4 font-bold">Stock</th>
              <th className="p-4 font-bold">EcoScore</th>
              <th className="p-4 font-bold">Audit Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {products.map(product => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900">{product.name}</td>
                <td className="p-4 text-gray-600">{product.stock} units</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <span className={`font-bold mr-2 ${product.ecoScore >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                      {product.ecoScore}
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${product.ecoScore >= 80 ? 'bg-green-500' : 'bg-orange-500'}`} 
                        style={{ width: `${product.ecoScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    product.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1 text-gray-400 hover:text-gray-600 mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
