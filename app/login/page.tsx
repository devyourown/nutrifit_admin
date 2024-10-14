"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login, signup } from '../lib/api';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError(''); // 초기화

        // 예시로 제공하는 인증 API 요청 코드 (실제 백엔드 API 연동 필요)
        await signup(email, password, 'ADMIN');
        const response = await login(email, password);
        if (response && response.ok) {
            // 로그인 성공 시 관리자 대시보드로 리다이렉트
            const data = await response.json();
            localStorage.setItem('jwt', data.token);
            router.push('/orders');
        } else {
            // 에러 처리
            setError('로그인에 실패했습니다.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">로그인</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <span>{error}</span>
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}
