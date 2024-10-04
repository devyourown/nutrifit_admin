import React, { useState } from 'react';

interface ShippingDetailsProps {
  shippingDetails: string[];
  onAddDetail: (detail: string) => void;
  onRemoveDetail: (index: number) => void;
}

export default function Shipping({ shippingDetails, onAddDetail, onRemoveDetail }: ShippingDetailsProps) {
  const [shipping, setShipping] = useState('');

  const handleAddShipping = () => {
    if (shipping.trim()) {
      onAddDetail(shipping.trim());
      setShipping('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddShipping();
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">배송 정보</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 배송 정보를 입력하세요."
        />
        <button type="button" onClick={handleAddShipping} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          추가
        </button>
      </div>
      <ul>
        {shippingDetails.map((detail, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {detail}
            <button
              onClick={() => onRemoveDetail(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
