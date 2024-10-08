"use client";

import { useEffect, useState } from "react";
import Modal from "../components/orders/upload-modal";
import Pagination from "../components/pagination";
import { createCoupon, deleteCoupon, fetchCouponsByPage } from "../lib/api";
import CouponTable from "../components/coupons/coupon-table";
import CouponCreateForm from "../components/coupons/coupon-create";
import { CouponDto } from "../lib/types";

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetchCoupons(currentPage);
  }, [currentPage]);

  async function fetchCoupons(page: number) {
    const data = await fetchCouponsByPage(page);
    console.log(data);
    setCoupons(data.content);
    setTotalPages(data.page.totalPages);
  }

  async function handleDeleteCoupon(couponCode: string) {
    if (confirm("정말로 이 쿠폰을 삭제하시겠습니까?")) {
      const data = await deleteCoupon(couponCode);
      if (data?.status !== 200) {
        alert("쿠폰 삭제에 실패했습니다. 쿠폰을 가지고 있는 유저가 있습니다.");
        return;
      }
      fetchCoupons(currentPage); // 삭제 후 목록 업데이트
    }
  }

  async function handleCreateCoupon(coupon: CouponDto) {
    await createCoupon(coupon);
    fetchCoupons(currentPage);
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
            </div>
          </div>
          <CouponTable coupons={coupons} onDelete={handleDeleteCoupon}/>
          <Pagination
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <h2 className="text-lg font-semibold mb-4">쿠폰 만들기</h2>
              <CouponCreateForm onSubmit={handleCreateCoupon} onClose={closeModal} />
            </Modal>
          )}
        </div>
      );
}
