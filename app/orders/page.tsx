"use client";

import OrderTable from "../components/orders/order-table";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import Filters from "../components/filter";
import {
  getOrdersByPage,
  getOrdersByQuery,
  getOrdersByStatus,
  getOrdersForExcelByFilter,
} from "../lib/api";
import { saveAs } from "file-saver";
import { filters } from "../lib/types";
import { convertJsonToExcel } from "../lib/converter";
import Modal from "../components/orders/upload-modal";
import ExcelUploader from "../components/orders/excel-uploader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosSync } from "react-icons/io";
import Searchbar from "../components/searchbar";
import { debounce } from "lodash";
import OrderTableSkeleton from "../components/skeleton/order-table";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState("주문완료");
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleExport = async () => {
    setDownloading(true);
    try {
      const limit = Math.min(totalPages * 10, 10000);
      const data = await getOrdersForExcelByFilter(status, limit);
      const blob = new Blob([convertJsonToExcel(data)], {
        type: "application/octet-stream",
      });
      saveAs(blob, `orders_${new Date().toISOString()}.xlsx`);
    } catch (error) {
      console.error("Failed to export data:", error);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (query !== "") {
      fetchOrdersByQuery(query, currentPage);
    } else if (status !== '전체') {
      fetchOrdersByFilter(status, currentPage);
    } else {
      fetchOrders(currentPage);
    }
  }, [status, currentPage, startDate, endDate, query]);

  async function fetchOrders(page: number) {
    const data = await getOrdersByPage(page, startDate, endDate);
    setOrders(data.content);
    setTotalPages(data.page.totalPages);
    setLoading(false);
  }

  async function fetchOrdersByFilter(status: string, page: number) {
    const data = await getOrdersByStatus(status, page, startDate, endDate);
    setOrders(data.content);
    setTotalPages(data.page.totalPages);
    setLoading(false);
  }

  async function fetchOrdersByQuery(query: string, page: number) {
    const data = await getOrdersByQuery(page, startDate, endDate, query);
    setOrders(data.content);
    setTotalPages(data.page.totalPages);
    setLoading(false);
  }

  function toggleFilter() {
    setCurrentPage(0);
    setIsFilterOpen(!isFilterOpen);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const debouncedSearch = debounce(async (query: string) => {
    setLoading(true);
    setCurrentPage(0);
    setQuery(query);
    fetchOrdersByQuery(query, currentPage);
    setLoading(false);
  }, 3000);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주문 관리</h1>
      <Searchbar debouncedSearch={debouncedSearch}/>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={toggleFilter}
          >
            필터
          </button>
          {isFilterOpen && (
            <Filters
              status={status}
              kindOfFilters={filters}
              onFilterChange={setStatus}
              toggleFilter={toggleFilter}
            />
          )}
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="시작 날짜"
              className="px-3 py-2 border rounded"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date!)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="종료 날짜"
              className="px-3 py-2 border rounded"
            />
          </div>
          <button
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={openModal}
          >
            운송장번호 업로드하기
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${downloading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleExport}
            disabled={downloading}
          >
            {downloading && (
            <IoIosSync className="animate-spin inline-block mr-2" />
          )}
          {downloading ? "내려받는 중..." : "선택 목록 엑셀로 내려받기"}
          </button>
        </div>
      </div>
      {loading ? <OrderTableSkeleton/> : <OrderTable orders={orders} query={query}/>}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-lg font-semibold mb-4">운송장번호 엑셀 업로드</h2>
          <ExcelUploader onClose={closeModal} fetchOrders={fetchOrders} />
        </Modal>
      )}
    </div>
  );
}
