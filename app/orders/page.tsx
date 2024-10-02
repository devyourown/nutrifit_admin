"use client";

import OrderTable from '../components/orders/order-table';
import { useEffect, useState } from 'react';
import Pagination from '../components/pagination';
import Filters from '../components/filter';
import { getOrdersByPage, getOrdersByStatus, getOrdersForExcelByFilter } from '../lib/api';
import {saveAs} from 'file-saver'
import { filters } from '../lib/types';
import { convertJsonToExcel } from '../lib/converter';
import Modal from '../components/orders/upload-modal';
import ExcelUploader from '../components/orders/excel-uploader';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleExport = async () => {
    setLoading(true);
    try {
      const data = await getOrdersForExcelByFilter(status);
      const blob = new Blob([convertJsonToExcel(data)], { type: 'application/octet-stream' });
      saveAs(blob, `orders_${new Date().toISOString().slice(0,10)}.xlsx`);
    } catch (error) {
      console.error('Failed to export data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status) {
      fetchOrdersByFilter(status, currentPage);
    } else {
      fetchOrders(currentPage);
    }
  }, [status, currentPage]);

  async function fetchOrders(page: number) {
    const data = await getOrdersByPage(page);
    setOrders(data.content);
    setTotalPages(data.page.totalPages);
  }

  async function fetchOrdersByFilter(status: string, page: number) {
    const data = await getOrdersByStatus(status, page);
    setOrders(data.content);
    setTotalPages(data.page.totalPages);
  }

  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주문 관리</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={toggleFilter}
          >
            필터
          </button>
          {isFilterOpen && <Filters kindOfFilters={filters} onFilterChange={setStatus} />}
        </div>
        <div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          onClick={openModal}>
            운송장번호 업로드하기
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={handleExport}>
            주문목록 엑셀로 내려받기
          </button>
        </div>
      </div>
      <OrderTable orders={orders} />
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-lg font-semibold mb-4">운송장번호 엑셀 업로드</h2>
          <ExcelUploader onClose={closeModal} fetchOrders={fetchOrders}/>
        </Modal>
      )}
    </div>
  );
}
