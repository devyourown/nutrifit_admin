"use client";

import React, { useState, useEffect } from 'react';
import ProductTable from '../components/products/product-table';
import Pagination from '../components/pagination';
import Filters from '../components/filter';
import { fetchProductById, fetchProductsByPage, makeProduct, updateProduct } from '../lib/api';
import { ProductDto } from '../lib/types';
import Modal from '../components/orders/upload-modal';
import ProductModal from '../components/products/product-modal';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductDto | undefined>(undefined);

    const handleAddProduct = async (newProduct: ProductDto, images: File[], detailImages: File[]) => {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('files', image);
        });
        detailImages.forEach((image) => {
          formData.append('detail_files', image);
        });
        try {
          const uploadResponse = await fetch('/api/product', {
            method: 'POST',
            body: formData,
          });
          const { urls, detailUrls } = await uploadResponse.json();
          newProduct.imageUrls = urls;
          newProduct.productDetailDto.detailImageUrls = detailUrls;
          const response = await makeProduct(newProduct);
          if (response) {
            alert('상품이 성공적으로 추가 되었습니다.');
          } else {
            alert('상품 등록에 실패했습니다. 다시 시도해 주세요.');
            throw Error('response status error');
          }
        } catch (e) {
          if (newProduct.imageUrls || newProduct.productDetailDto.detailImageUrls) {
            await fetch('/api/product', {
              method: 'DELETE',
              body: JSON.stringify({ urls: newProduct.imageUrls, 
                detailUrls: newProduct.productDetailDto.detailImageUrls}),
            });
          }
          console.error('Failed to make product : ', e);
        }
    };

    const handleUpdateProduct = async (product: ProductDto, images: File[], detailImages: File[], deleteImages: string[]) => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('files', image);
      });
      detailImages.forEach((image) => {
        formData.append('detail_files', image);
      });
      try {
        const uploadResponse = await fetch('/api/product', {
          method: 'POST',
          body: formData,
        });
        const { urls, detailUrls } = await uploadResponse.json();
        product.imageUrls.push(urls);
        product.productDetailDto.detailImageUrls.push(detailUrls);
        if (deleteImages) {
          await fetch('/api/product', {
            method: 'DELETE',
            body: JSON.stringify({ urls: deleteImages}),
          });
        }
        const response = await updateProduct(product);
        if (response) {
          alert('상품이 성공적으로 추가 되었습니다.');
        } else {
          alert('상품 등록에 실패했습니다. 다시 시도해 주세요.');
          throw Error('response status error');
        }
      } catch (e) {
        if (product.imageUrls || product.productDetailDto.detailImageUrls) {
          await fetch('/api/product', {
            method: 'DELETE',
            body: JSON.stringify({ urls: product.imageUrls, 
              detailUrls: product.productDetailDto.detailImageUrls}),
          });
        }
        console.error('Failed to make product : ', e);
      }
    }

    const handleEditProduct = async (productId: number) => {
      const product = await fetchProductById(productId);
      setEditingProduct(product);
      setIsModalOpen(true);
    }


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
            {isFilterOpen && <Filters kindOfFilters={["출시전", "재고없음"]} onFilterChange={() => fetchProducts(1)} toggleFilter={toggleFilter} status={filterStatus}/>}
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingProduct(undefined);
            setIsModalOpen(true);
          }}>
            + 상품 추가하기
          </button>
        </div>
      </div>
      <ProductTable products={products} onEdit={handleEditProduct}/>
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}><ProductModal productToEdit={editingProduct} onEdit={handleUpdateProduct} onClose={() => setIsModalOpen(false)} onSubmit={handleAddProduct}/></Modal> }
    </div>
  );
}
