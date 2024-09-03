export default function CouponList() {
    // 임시 데이터
    const coupons = [
        { id: 1, code: 'DISCOUNT10', discount: 10, validUntil: '2024-12-31' },
        { id: 2, code: 'FREESHIP', discount: 0, validUntil: '2024-12-31', freeShipping: true },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">쿠폰 목록</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">쿠폰 ID</th>
                        <th className="py-2">코드</th>
                        <th className="py-2">할인율</th>
                        <th className="py-2">유효기간</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td className="py-2">{coupon.id}</td>
                            <td className="py-2">{coupon.code}</td>
                            <td className="py-2">{coupon.discount}%</td>
                            <td className="py-2">{coupon.validUntil}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
