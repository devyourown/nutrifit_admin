# 🛠️ Nutrifit Admin

Nutrifit Admin은 Nutrifit 서비스의 관리자 페이지입니다.  
상품 관리, 주문 관리, 사용자 관리 등 운영자가 사용하는 백오피스 기능을 제공합니다.

---

## 📦 기술 스택

-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **UI**: TailwindCSS
-   **Auth**: JWT
-   **API**: Spring Boot Backend와 통신
-   **Etc**: xlsx, s3client 등

---

## 🚀 실행 순서

1. PostgreSQL DB 실행
2. Redis 실행
3. Backend 서버 실행
4. Admin(Frontend) 서버 실행

---

## 🧾 주요 기능

-   ✅ 상품 목록 및 상세 관리
-   ✅ 주문 목록, 상세 및 상태 변경
-   ✅ 회원 및 유저 정보 조회
-   ✅ 쿠폰/포인트 발급 및 조회
-   ✅ 리뷰, 문의글 확인 및 답변

---

## 🗂️ 주요 폴더 구조

-   components: 공통 UI 컴포넌트 (Header, Sidebar 등)
-   coupons: 쿠폰 생성, 조회, 삭제 등 쿠폰 관리 기능
-   customers: 고객 정보, 리뷰, Q&A, 주문 내역 등 관리
-   api: Next.js API 라우트 (관리자 기능 관련)
-   lib: API 요청, 유틸 함수 등 공통 로직
-   login: 관리자 로그인 페이지 및 인증 처리
-   main: 관리자 대시보드 메인 페이지
-   orders: 주문 내역 및 주문 상태 변경 기능
-   products: 상품 등록, 수정, 삭제 및 목록 관리

---

## 📁 관련 레포

-   [Nutrifit Frontend](https://github.com/devyourown/nutrifit_front)
-   [Nutrifit Backend](https://github.com/devyourown/nutrifit_mall)
-   [Nutrifit Overview Docs](https://github.com/devyourown/nutrifit-overview)

---

## ⚙️ 환경변수 예시 (`.env`)

env
BACKEND_URL="http://localhost:5000/api"
NEXT_PUBLIC_BACKEND_URL="http://localhost:5000/api"
.env 파일은 커밋하지 않도록 .gitignore에 반드시 추가되어 있어야 합니다.

## 👨‍💻 개발자 가이드

bash

# 패키지 설치

npm install

# 개발 서버 실행

npm run dev

# 빌드

npm run build

## 📝 License

MIT License

---
