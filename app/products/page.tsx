"use client";

import React, { useState, useEffect } from 'react';
import ProductTable from '../components/products/product-table';
import Pagination from '../components/pagination';
import Filters from '../components/filter';
import { fetchProductsByPage, makeProduct } from '../lib/api';
import { ProductDto } from '../lib/types';
import AddProductModal from '../components/products/product-modal';
import Modal from '../components/orders/upload-modal';
import { deleteFileFromS3 } from '../api/product/route';

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProduct = async (newProduct: ProductDto, images: File[]) => {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('files', image);
        });
        try {
          const uploadResponse = await fetch('/api/product', {
            method: 'POST',
            body: formData,
          });
          const { uploadedUrls } = await uploadResponse.json();
          newProduct.imageUrls = uploadedUrls
          const response = await makeProduct(localStorage.getItem('token')!, newProduct);
          if (response.status === 201) {
            alert('상품이 성공적으로 추가 되었습니다.');
          } else {
            uploadedUrls.forEach(async (url: string) => await deleteFileFromS3(url));
            alert('상품 등록에 실패했습니다. 다시 시도해 주세요.');
          }
        } catch (e) {
          console.error('Failed to make product : ', e);
        }
    };


  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  async function fetchProducts(page: number) {
    const data = await fetchProductsByPage(page);
    setProducts(data.content);
    setTotalPages(data.page.totalPages);
  }

  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">상품 관리</h1>
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}>
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
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}><AddProductModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddProduct}/></Modal> }
    </div>
  );
}
