import Link from "next/link";

export default function Sidebar() {

    return (
        <aside className="w-64 bg-gray-800 text-white">
              <div className="p-4 text-center font-bold text-xl">Nutrifit Admin</div>
              <nav className="mt-6">
                  <Link href="/orders" className="block mb-4 py-2 px-4 hover:bg-gray-700">주문 목록
                  </Link>
                  <Link href="/products" className="block mb-4 py-2 px-4 hover:bg-gray-700">상품 목록
                  </Link>
                  <Link href="/customers" className="block mb-4 py-2 px-4 hover:bg-gray-700">고객 목록
                  </Link>
                  <Link href="/coupons" className="block mb-4  py-2 px-4 hover:bg-gray-700">쿠폰 목록
                  </Link>
                  <Link href="/settings" className="block mb-4 py-2 px-4 hover:bg-gray-700">설정
                  </Link>
              </nav>
          </aside>
    );
}