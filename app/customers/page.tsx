export default function CustomerList() {
    // 임시 데이터
    const customers = [
        { id: 1, name: '홍길동', email: 'hong@example.com' },
        { id: 2, name: '이몽룡', email: 'lee@example.com' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">고객 목록</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">고객 ID</th>
                        <th className="py-2">이름</th>
                        <th className="py-2">이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td className="py-2">{customer.id}</td>
                            <td className="py-2">{customer.name}</td>
                            <td className="py-2">{customer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
