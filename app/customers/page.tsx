"use client";

import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import CustomerTable from "../components/customers/customer-table";
import PaymentListModal from "../components/customers/payments-modal";
import QnAModal from "../components/customers/qna-modal";
import PointsCouponsModal from "../components/customers/point-coupon-modal";
import SubscriptionModal from "../components/customers/subscription-modal";
import ReviewModal from "../components/customers/review-modal";
import { fetchUsersByPage } from "../lib/api";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isQnAModalOpen, setIsQnAModalOpen] = useState(false);
    const [isPointsCouponsModalOpen, setIsPointsCouponsModalOpen] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    async function fetchUsers(currentPage: number) {
        const data = await fetchUsersByPage(currentPage);
        setTotalPages(data.page.totalPages);
        setCustomers(data.content);
    }

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage])

    const handleOpenPaymentModal = (customerId: number) => {
        setSelectedCustomer(customerId);
        setIsPaymentModalOpen(true);
    }

    const handleOpenQnAModal = (customerId: number) => {
        setSelectedCustomer(customerId);
        setIsQnAModalOpen(true);
      };
    
      const handleOpenPointsCouponsModal = (customerId: number) => {
        setSelectedCustomer(customerId);
        setIsPointsCouponsModalOpen(true);
      };
    
      const handleOpenSubscriptionModal = (customerId: number) => {
        setSelectedCustomer(customerId);
        setIsSubscriptionModalOpen(true);
      };
    
      const handleOpenReviewModal = (customerId: number) => {
        setSelectedCustomer(customerId);
        setIsReviewModalOpen(true);
      };

      const handleCloseModals = () => {
        setIsPaymentModalOpen(false);
        setIsQnAModalOpen(false);
        setIsPointsCouponsModalOpen(false);
        setIsSubscriptionModalOpen(false);
        setIsReviewModalOpen(false);
      };

    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">고객 관리</h1>
          <div className="flex justify-between items-center mb-4">
          </div>
          <CustomerTable 
        customers={customers}
        onPayment={handleOpenPaymentModal}
        onQnA={handleOpenQnAModal}
        onPointCoupon={handleOpenPointsCouponsModal}
        onSubscription={handleOpenSubscriptionModal}
        onReview={handleOpenReviewModal}/>
          <Pagination
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
          {isPaymentModalOpen && selectedCustomer && (
        <PaymentListModal onClose={handleCloseModals} customerId={selectedCustomer} />
      )}
      {isQnAModalOpen && selectedCustomer && (
        <QnAModal onClose={handleCloseModals} customerId={selectedCustomer} />
      )}
      {isPointsCouponsModalOpen && selectedCustomer && (
        <PointsCouponsModal onClose={handleCloseModals} customerId={selectedCustomer} />
      )}
      {isSubscriptionModalOpen && selectedCustomer && (
        <SubscriptionModal onClose={handleCloseModals} customerId={selectedCustomer} />
      )}
      {isReviewModalOpen && selectedCustomer && (
        <ReviewModal onClose={handleCloseModals} customerId={selectedCustomer} />
      )}
        </div>
      );
}
