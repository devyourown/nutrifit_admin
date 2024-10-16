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
  query: string;
}

function highlightText(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function OrderTable({ orders, query }: OrderTableProps) {
  return (
    <div className="min-w-full bg-white border border-gray-200 p-4">
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">해당하는 주문이 없습니다.</div>
      ) : (
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
            <td className="px-4 py-2 border-b text-center">{highlightText(order.id, query)}</td>
            <td className="px-4 py-2 border-b text-center">{highlightText(order.orderDate, query)}</td>
            <td className="px-4 py-2 border-b text-center">{highlightText(order.productName, query)}</td>
            <td className="px-4 py-2 border-b text-center">{highlightText(order.username, query)}</td>
            <td className="px-4 py-2 border-b text-center">{highlightText(order.fulfillment, query)}</td>
            <td className="px-4 py-2 border-b text-center">
              {order.trackingNumber ? highlightText(order.trackingNumber.toString(), query) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      )}
  </div>
  );
}
