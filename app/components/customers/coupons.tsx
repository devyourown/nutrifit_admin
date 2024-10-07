import { fetchCouponsByUser } from "@/app/lib/api";
import { CouponDto } from "@/app/lib/types";
import React, { useEffect, useState } from "react";
import Pagination from "../pagination";

interface CouponListProps {
  customerId: number;
}

export default function CouponList({ customerId}: CouponListProps) {
    const [coupons, setCoupons] = useState<CouponDto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    async function fetchCoupons(page: number) {
        const data = await fetchCouponsByUser(customerId, page);
        setCoupons(data.content);
        setTotalPages(data.page.totalPages);
    }

    useEffect(() => {
        fetchCoupons(currentPage);
    }, [currentPage]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">쿠폰 목록:</h3>
      <div className="mt-2">
        {coupons ? (
            <div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">코드</th>
                <th className="px-4 py-2 border-b">설명</th>
                <th className="px-4 py-2 border-b">할인 타입</th>
                <th className="px-4 py-2 border-b">할인 값</th>
                <th className="px-4 py-2 border-b">유효 기간 시작</th>
                <th className="px-4 py-2 border-b">유효 기간 종료</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b text-center">{coupon.code}</td>
                  <td className="px-4 py-2 border-b text-center">{coupon.description}</td>
                  <td className="px-4 py-2 border-b text-center">{coupon.discountType}</td>
                  <td className="px-4 py-2 border-b text-center">{coupon.discountValue}</td>
                  <td className="px-4 py-2 border-b text-center">{coupon.validFrom.toLocaleString()}</td>
                  <td className="px-4 py-2 border-b text-center">{coupon.validUntil.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => setCurrentPage(page)} 
        /></div>
        ) : (
          <p className="text-center text-gray-500">사용 가능한 쿠폰이 없습니다.</p>
        )}
      </div>
    </div>
  );
};
