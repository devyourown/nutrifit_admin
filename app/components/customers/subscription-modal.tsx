import React from "react";

interface SubscriptionModalProps {
  customerId: number;
  onClose: () => void;
}

export default function SubscriptionModal({ customerId, onClose }: SubscriptionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">구독 관리 for {customerId}</h2>
        {/* Subscription management content */}
        <div className="mt-4">
          {/* Replace with actual content */}
          <p>현재 구독 상태: 활성화</p>
          <p>구독 만료일: 2024-01-01</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          닫기
        </button>
      </div>
    </div>
  );
}
