import React from 'react';
import { CouponDto } from '@/app/lib/types'; // CouponDto를 실제 경로로 import

interface CouponListProps {
  coupons: CouponDto[];
  onDelete: (couponCode: string) => void; // 쿠폰 삭제 함수 추가
}

export default function CouponTable({ coupons, onDelete }: CouponListProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">쿠폰 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{coupon.code}</h2>
            {coupon.description && (
              <p className="text-gray-600 mb-2">{coupon.description}</p>
            )}
            <p className="text-blue-500 font-bold text-lg mb-2">
              {coupon.discountValue}
              {coupon.discountType === 'PERCENTAGE' ? '%' : '₩'} 할인
            </p>
            <p className="text-gray-500 text-sm">
              최소 주문 금액: ₩{coupon.minimumOrderAmount!.toLocaleString()}
            </p>
            {coupon.maxDiscountAmount! > 0 && (
              <p className="text-gray-500 text-sm mb-2">
                최대 할인 금액: ₩{coupon.maxDiscountAmount!.toLocaleString()}
              </p>
            )}
            <p className="text-gray-500 text-sm mb-2">
              유효 기간: {new Date(coupon.validFrom).toLocaleDateString()} ~{' '}
              {new Date(coupon.validUntil).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              남은 수량: {coupon.remainingQuantity}
            </p>
            {/* 삭제 버튼 추가 */}
            <button
              onClick={() => onDelete(coupon.code)} // 쿠폰 삭제 함수 호출
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
