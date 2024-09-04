import React from 'react';

interface Order {
  id: string;
  orderDate: string;
  username: string;
  fulfillment: string;
  productName: string;
  trackingNumber?: number;
}

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">주문번호</th>
          <th className="px-4 py-2 border-b">주문날짜</th>
          <th className="px-4 py-2 border-b">상품 이름</th>
          <th className="px-4 py-2 border-b">고객명</th>
          <th className="px-4 py-2 border-b">배송 상황</th>
          <th className="px-4 py-2 border-b">운송장번호</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id + index}>
            <td className="px-4 py-2 border-b text-center">{order.id}</td>
            <td className="px-4 py-2 border-b text-center">{order.orderDate}</td>
            <td className="px-4 py-2 border-b text-center">{order.productName}</td>
            <td className="px-4 py-2 border-b text-center">{order.username}</td>
            <td className="px-4 py-2 border-b text-center">{order.fulfillment}</td>
            <td className="px-4 py-2 border-b text-center">{order.trackingNumber ? order.trackingNumber : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
