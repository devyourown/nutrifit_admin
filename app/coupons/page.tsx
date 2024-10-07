"use client";

import { useEffect, useState } from "react";
import Modal from "../components/orders/upload-modal";
import Pagination from "../components/pagination";
import { fetchCouponsByPage, fetchCouponsByUser } from "../lib/api";

export default function CouponList() {
    const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
  }, []);

  async function fetchOrders(page: number) {
    const data = await fetchCouponsByPage(page);
    setCoupons(data.content);
    setTotalPages(data.page.totalPages);
  }
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">쿠폰 관리</h1>
          <div className="flex justify-between items-center mb-4">
            <div>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={openModal}>
                쿠폰 만들기
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
                쿠폰 삭제하기
              </button>
            </div>
          </div>
          <Pagination
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <h2 className="text-lg font-semibold mb-4">쿠폰 만들기</h2>
            </Modal>
          )}
        </div>
      );
}
