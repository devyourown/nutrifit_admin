"use client";

import OrderTable from '../components/orders/order-table';
import { useEffect, useState } from 'react';
import Pagination from '../components/pagination';
import Filters from '../components/filter';
import { getOrdersByPage, getOrdersByStatus, getOrdersForExcelByFilter } from '../lib/api';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver'
import { filters } from '../lib/types';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // API 호출
      const data = await getOrdersForExcelByFilter(status);
      // 엑셀 데이터 포맷 지정
      console.log(data);
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      // 컬럼 이름 설정
      XLSX.utils.sheet_add_aoa(worksheet, [
        ["주문번호", "주문상품", "주문수", "수령자명", "수령자전화번호", "구매자명", "구매자전화번호", "배송지주소", "배송시 주의사항"]
      ], { origin: 'A1' });

      // Excel 파일 생성
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      // 파일 다운로드
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
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
    const data = await getOrdersByPage(page-1);
    setOrders(data.content);
    setTotalPages(data.totalPages);
  }

  async function fetchOrdersByFilter(status: string, page: number) {
    const data = await getOrdersByStatus(status, page-1);
    setOrders(data.content);
    setTotalPages(data.totalPages);
  }

  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주문 관리</h1>
      <div className="relative mb-4">
          <button
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={toggleFilter}
          >
            필터
          </button>
          {isFilterOpen && <Filters kindOfFilters={filters} onFilterChange={setStatus} />}
          <div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            엑셀로 상품 업로드하기
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
    </div>
  );
}
