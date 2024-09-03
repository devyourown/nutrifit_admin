"use client";

import React, { useState, useEffect } from 'react';
import ProductTable from '../components/products/product-table';
import Pagination from '../components/pagination';
import Filters from '../components/filter';

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  async function fetchProducts(page: number) {
    const response = await fetch(`/api/products?page=${page}`);
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(data.totalPages);
  }

  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="flex justify-between items-center mb-4">
      <div className="relative">
          <button
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={toggleFilter}
          >
            필터
          </button>
          {isFilterOpen && <Filters kindOfFilters={["출시전", "재고없음"]} onFilterChange={() => fetchProducts(1)} />}
        </div>
        <div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            엑셀로 상품 업로드하기
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            상품 엑셀로 내려받기
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + 상품 추가하기
          </button>
        </div>
      </div>
      <ProductTable products={products} />
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
}
