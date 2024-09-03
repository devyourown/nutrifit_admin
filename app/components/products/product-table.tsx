import React from 'react';

interface Product {
  id: string;
  name: string;
  collection: string;
  status: string;
  availability: string;
  inventory: string;
}

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Name</th>
          <th className="px-4 py-2 border-b">Collection</th>
          <th className="px-4 py-2 border-b">Status</th>
          <th className="px-4 py-2 border-b">Availability</th>
          <th className="px-4 py-2 border-b">Inventory</th>
          <th className="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-2 border-b">{product.name}</td>
            <td className="px-4 py-2 border-b">{product.collection}</td>
            <td className="px-4 py-2 border-b">{product.status}</td>
            <td className="px-4 py-2 border-b">{product.availability}</td>
            <td className="px-4 py-2 border-b">{product.inventory}</td>
            <td className="px-4 py-2 border-b">
              <button className="text-gray-700 hover:text-gray-900">...</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
