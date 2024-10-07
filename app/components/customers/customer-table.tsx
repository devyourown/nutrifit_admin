import { useState } from "react";
import { UserDto } from "../../lib/types";


interface CustomerTableProps {
  customers: UserDto[];
  onPayment: (customerId: number) => void;
  onQnA: (customerId: number) => void;
  onPointCoupon: (customerId: number) => void;
  onSubscription: (customerId: number) => void;
  onReview: (customerId: number) => void;
}

export default function CustomerTable({ 
  customers, 
  onPayment, onQnA, onPointCoupon,
  onSubscription, onReview
 }: CustomerTableProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
        <th className="px-4 py-2 border-b">ID</th>
          <th className="px-4 py-2 border-b">닉네임</th>
          <th className="px-4 py-2 border-b">이메일</th>
          <th className="px-4 py-2 border-b">가입일</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={customer.id}>
            <td className="px-4 py-2 border-b text-center">{customer.id}</td>
            <td className="px-4 py-2 border-b text-center">{customer.username}</td>
            <td className="px-4 py-2 border-b text-center">{customer.email}</td>
            <td className="px-4 py-2 border-b text-center">{customer.createdAt}</td>
            <td className="px-4 py-2 border-b text-center relative">
              {/* "..." 버튼 */}
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => handleMenuToggle(index)}
              >
                ...
              </button>

              {/* 드롭다운 메뉴 */}
              {openMenuIndex === index && (
                <div className="absolute z-40 right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                  <div className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <p className="font-semibold mb-2">상세 정보</p>
                    <button className="block w-full text-left px-4 py-1 text-sm text-blue-500 hover:bg-blue-100"
                    onClick={() =>{ onPayment(customer.id); setOpenMenuIndex(null);}}>
                      결제 목록
                    </button>
                    <button className="block w-full text-left px-4 py-1 text-sm text-blue-500 hover:bg-blue-100"
                    onClick={() => {onQnA(customer.id);setOpenMenuIndex(null);}}>
                      Q&A
                    </button>
                    <button className="block w-full text-left px-4 py-1 text-sm text-blue-500 hover:bg-blue-100"
                    onClick={() => {onPointCoupon(customer.id); setOpenMenuIndex(null);}}>
                      포인트 / 쿠폰
                    </button>
                    <button className="block w-full text-left px-4 py-1 text-sm text-blue-500 hover:bg-blue-100"
                    onClick={() => {onSubscription(customer.id); setOpenMenuIndex(null);}}>
                      구독 관리
                    </button>
                    <button className="block w-full text-left px-4 py-1 text-sm text-blue-500 hover:bg-blue-100"
                    onClick={() => {onReview(customer.id); setOpenMenuIndex(null);}}>
                      리뷰
                    </button>
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
