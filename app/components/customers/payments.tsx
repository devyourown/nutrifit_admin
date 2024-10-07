import { PaymentDto } from "@/app/lib/types";

interface PaymentListProps {
    payments: PaymentDto[];
}

export default function PaymentList({ payments }: PaymentListProps) {
  return (
    <div className="flex flex-col space-y-4">
      {payments && payments.map((payment, index) => (
        <div key={index} className="flex flex-col p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3>결제 날짜: {payment.paymentDate}</h3>
          <div className="flex items-center space-x-4">
            <img src={payment.orderItems[0].imageUrl} alt={payment.orderItems[0].name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="text-lg font-semibold">{payment.orderItems[0].name}</h3>
              <p className="text-sm text-gray-600">{payment.orderItems[0].quantity}개 x {payment.orderItems[0].price}원</p>
              <p className="text-sm font-bold">{(payment.total).toLocaleString('ko-KR')}원</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">주문 상세보기</button>
          </div>
        </div>
      ))}
    </div>
  );
}
