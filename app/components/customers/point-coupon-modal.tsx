import React, { useEffect, useState } from "react";
import PointTransactionList from "./point-transactions";
import { fetchPointByUser } from "@/app/lib/api";
import CouponList from "./coupons";

interface PointsCouponsModalProps {
  customerId: number;
  onClose: () => void;
}

export default function PointsCouponsModal({ customerId, onClose }: PointsCouponsModalProps) {
    const [point, setPoint] = useState(0);
    
    
    async function fetchPoint() {
        const data = await fetchPointByUser(customerId);
        setPoint(data.points);
    }

    useEffect(() => {
        fetchPoint();
    }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold">포인트 / 쿠폰 (ID : {customerId})</h2>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">총 포인트: {point}</h3>
          <PointTransactionList customerId={customerId}/>
          <CouponList customerId={customerId}/>
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          닫기
        </button>
        </div>
        </div>
  );
}
