import { ProductDto } from "@/app/lib/types";

interface ProductTableProps {
  products: ProductDto[];
}

export default function ProductTable({ products }: ProductTableProps) {
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
        {products.map((product) => (
          <tr key={product.name}>
            <td className="px-4 py-2 border-b text-center">{product.name}</td>
            <td className="px-4 py-2 border-b text-center">{product.originalPrice + '/' + product.discountedPrice}</td>
            <td className="px-4 py-2 border-b text-center">{product.released ? '출시' : '출시전'}</td>
            <td className="px-4 py-2 border-b text-center">{product.stockQuantity}</td>
            <td className="px-4 py-2 border-b text-center">{(product.reviewRating! / product.reviewCount!).toFixed(1) + '/' + product.reviewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
