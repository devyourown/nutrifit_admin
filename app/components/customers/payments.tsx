import { OrderItemDto } from "@/app/lib/types";

interface PaymentListProps {
    orderItems: OrderItemDto[];
}

export default function PaymentList({ orderItems }: PaymentListProps) {
  return (
    <div className="flex flex-col space-y-4">
      {orderItems && orderItems.map((orderItem, index) => (
        <div key={index} className="flex flex-col p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3>결제 날짜: {orderItem.orderDate}</h3>
          <div className="flex items-center space-x-4">
            <img src={orderItem.imageUrl} alt={orderItem.productName} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="text-lg font-semibold">{orderItem.productName}</h3>
              <p className="text-sm text-gray-600">{orderItem.quantity}개 x {orderItem.price}원</p>
              <p className="text-sm font-bold">{(orderItem.totalAmount).toLocaleString('ko-KR')}원</p>
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
