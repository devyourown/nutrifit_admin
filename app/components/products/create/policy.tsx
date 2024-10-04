import React, { useState } from 'react';

interface ExchangeAndReturnsProps {
  exchangeAndReturns: string[];
  onAddReturnPolicy: (policy: string) => void;
  onRemoveReturnPolicy: (index: number) => void;
}

export default function Policy({ exchangeAndReturns, onAddReturnPolicy, onRemoveReturnPolicy }: ExchangeAndReturnsProps) {
  const [policy, setPolicy] = useState('');

  const handleAddPolicy = () => {
    if (policy.trim()) {
      onAddReturnPolicy(policy);
      setPolicy('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPolicy();
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">교환 및 환불 규정</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 환불 규정을 입력하세요."
        />
        <button type='button' onClick={handleAddPolicy} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          추가
        </button>
      </div>
      <ul>
        {exchangeAndReturns.map((policy, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {policy}
            <button
              onClick={() => onRemoveReturnPolicy(index)}
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
