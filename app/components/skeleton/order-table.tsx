export default function OrderTableSkeleton() {
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
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b text-center">
                <div className="animate-pulse bg-gray-300 h-4 w-24 mx-auto rounded"></div>
              </td>
              <td className="px-4 py-2 border-b text-center">
                <div className="animate-pulse bg-gray-300 h-4 w-32 mx-auto rounded"></div>
              </td>
              <td className="px-4 py-2 border-b text-center">
                <div className="animate-pulse bg-gray-300 h-4 w-36 mx-auto rounded"></div>
              </td>
              <td className="px-4 py-2 border-b text-center">
                <div className="animate-pulse bg-gray-300 h-4 w-20 mx-auto rounded"></div>
              </td>
              <td className="px-4 py-2 border-b text-center">
                <div className="animate-pulse bg-gray-300 h-4 w-28 mx-auto rounded"></div>
              </td>
              <td className="px-4 py-2 border-b text-center">
                <div className="animate-pulse bg-gray-300 h-4 w-24 mx-auto rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }