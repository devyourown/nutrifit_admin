import { ProductDto } from "@/app/lib/types";
import { useState } from "react";

interface ProductTableProps {
  products: ProductDto[];
  onEdit: (productId: number) => void;
}

export default function ProductTable({ products, onEdit }: ProductTableProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">상품 이름</th>
          <th className="px-4 py-2 border-b">가격</th>
          <th className="px-4 py-2 border-b">출시 상태</th>
          <th className="px-4 py-2 border-b">재고 개수</th>
          <th className="px-4 py-2 border-b">평점</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td className="px-4 py-2 border-b text-center">{product.name}</td>
            <td className="px-4 py-2 border-b text-center">{product.originalPrice + '/' + product.discountedPrice}</td>
            <td className="px-4 py-2 border-b text-center">{product.released ? '출시' : '출시전'}</td>
            <td className="px-4 py-2 border-b text-center">{product.stockQuantity}</td>
            <td className="px-4 py-2 border-b text-center">{(product.reviewRating! / product.reviewCount!).toFixed(1) + '/' + product.reviewCount}</td>
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
                <div className="absolute z-50 right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onEdit(product.id)}
                  >
                    수정하기
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
