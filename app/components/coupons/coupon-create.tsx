import { CouponDto } from "@/app/lib/types";
import { useState } from "react";

interface CouponCreateFormProps {
  onSubmit: (coupon: CouponDto) => void;
  onClose: () => void;
}

export default function CouponCreateForm({ onSubmit, onClose }: CouponCreateFormProps) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountValue, setDiscountValue] = useState<string>(""); // 초기값을 빈 문자열로
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [minimumOrderAmount, setMinimumOrderAmount] = useState<string>(""); // 초기값을 빈 문자열로
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<string>(""); // 초기값을 빈 문자열로
  const [remainingQuantity, setRemainingQuantity] = useState<string>(""); // 초기값을 빈 문자열로

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validFromDate = new Date(validFrom).toISOString();
    const validUntilDate = new Date(validUntil).toISOString();
    const newCoupon: CouponDto = {
      code,
      description,
      discountValue: Number(discountValue) || 0, // 빈 값이면 0을 기본값으로
      validFrom: validFromDate,
      validUntil: validUntilDate,
      discountType,
      minimumOrderAmount: Number(minimumOrderAmount) || 0, // 빈 값이면 0을 기본값으로
      maxDiscountAmount: Number(maxDiscountAmount) || 0, // 빈 값이면 0을 기본값으로
      remainingQuantity: Number(remainingQuantity) || 0, // 빈 값이면 0을 기본값으로
    };
    onSubmit(newCoupon);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold">쿠폰 코드</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">할인율</label>
        <input
          type="number"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)} // 문자열을 바로 처리
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">할인 유형</label>
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="PERCENTAGE">퍼센트 할인</option>
          <option value="AMOUNT">정액 할인</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">최소 주문 금액</label>
        <input
          type="number"
          value={minimumOrderAmount}
          onChange={(e) => setMinimumOrderAmount(e.target.value)} // 문자열로 처리
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">최대 할인 금액</label>
        <input
          type="number"
          value={maxDiscountAmount}
          onChange={(e) => setMaxDiscountAmount(e.target.value)} // 문자열로 처리
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">남은 수량</label>
        <input
          type="number"
          value={remainingQuantity}
          onChange={(e) => setRemainingQuantity(e.target.value)} // 문자열로 처리
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">유효 기간 (시작)</label>
        <input
          type="date"
          value={validFrom}
          onChange={(e) => setValidFrom(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">유효 기간 (끝)</label>
        <input
          type="date"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
        >
          취소
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          쿠폰 생성하기
        </button>
      </div>
    </form>
  );
}
